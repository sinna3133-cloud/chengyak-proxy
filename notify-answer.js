/**
 * api/notify-answer.js
 * 문의 답변 완료 시 유저에게 푸시 알림 발송
 * POST /api/notify-answer { nickname, title, answer }
 */

const SUPABASE_URL  = process.env.SUPABASE_URL;
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY;

async function sbFetch(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}

async function getAccessToken() {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    sub: serviceAccount.client_email,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/firebase.messaging'
  };

  const base64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const signingInput = `${base64url(header)}.${base64url(payload)}`;

  const { createSign } = await import('crypto');
  const sign = createSign('RSA-SHA256');
  sign.update(signingInput);
  const signature = sign.sign(serviceAccount.private_key, 'base64url');
  const jwt = `${signingInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });
  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function sendPush(fcmToken, title, body) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    const projectId = serviceAccount.project_id;
    const accessToken = await getAccessToken();

    const res = await fetch(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: {
            token: fcmToken,
            notification: { title, body },
            data: { screen: 'my-inquiries' },
            apns: {
              payload: {
                aps: { sound: 'default', badge: 1 }
              }
            }
          }
        })
      }
    );
    return res.ok;
  } catch(e) {
    console.error('FCM 발송 오류:', e.message);
    return false;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: '허용되지 않는 메서드' });

  const { nickname, title } = req.body || {};
  if (!nickname) return res.status(400).json({ error: 'nickname 없음' });

  try {
    // 닉네임으로 FCM 토큰 조회
    const tokens = await sbFetch(
      `push_tokens?select=fcm_token&fcm_token=not.is.null`
    );

    // profiles에서 닉네임으로 kakao_id 찾기
    const profiles = await sbFetch(
      `profiles?nickname=eq.${encodeURIComponent(nickname)}&select=id`
    );

    if (!profiles?.length) {
      return res.status(200).json({ message: '유저 없음', sent: 0 });
    }

    const userId = profiles[0].id;

    // 해당 유저의 FCM 토큰 조회
    const userTokens = await sbFetch(
      `push_tokens?kakao_id=eq.${encodeURIComponent(userId)}&fcm_token=not.is.null&select=fcm_token`
    );

    if (!userTokens?.length) {
      return res.status(200).json({ message: '토큰 없음', sent: 0 });
    }

    let sent = 0;
    for (const { fcm_token } of userTokens) {
      const ok = await sendPush(
        fcm_token,
        '문의 답변이 도착했어요 💬',
        `[${title}] 문의에 답변이 등록됐어요. 확인해보세요!`
      );
      if (ok) sent++;
    }

    return res.status(200).json({ message: '완료', sent });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
