/**
 * api/notify.js
 * 청약 마감 임박 푸시 알림 발송
 * Vercel Cron으로 매일 오전 9시 실행
 */

const SUPABASE_URL  = process.env.SUPABASE_URL;
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY;
const PUBLIC_DATA_API_KEY = process.env.PUBLIC_DATA_API_KEY;

// Supabase fetch helper
async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  return res.json();
}

// Firebase FCM V1 액세스 토큰 발급
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

  // JWT 생성 (간단 구현)
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

// FCM V1으로 푸시 발송
async function sendPush(fcmToken, title, body, data = {}) {
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
            data,
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
  // Cron 인증 (Vercel Cron 자동 호출 시 CRON_SECRET 검증)
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: '인증 실패' });
  }

  try {
    const today = new Date();
    const results = { sent: 0, skipped: 0, errors: 0 };

    // 1. FCM 토큰 있는 유저 전체 조회
    const tokens = await sbFetch('push_tokens?select=kakao_id,fcm_token&fcm_token=not.is.null');
    if (!tokens?.length) return res.status(200).json({ message: '토큰 없음', results });

    // 2. 공공데이터 API에서 현재 청약 공고 조회
    const apiRes = await fetch(
      `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=100&serviceKey=${PUBLIC_DATA_API_KEY}`
    );
    const apiData = await apiRes.json();
    const listings = apiData?.data || [];

    // 3. 각 유저별 처리
    for (const { kakao_id, fcm_token } of tokens) {
      try {
        // 즐겨찾기 조회
        const bookmarks = await sbFetch(
          `bookmarks?user_id=eq.${kakao_id}&select=listing_id`
        );
        if (!bookmarks?.length) { results.skipped++; continue; }

        const bookmarkIds = new Set(bookmarks.map(b => String(b.listing_id)));

        // 즐겨찾기한 공고 중 마감 임박 확인
        for (const listing of listings) {
          const listingId = String(listing.PBLANC_NO || listing.pblanc_no || '');
          if (!bookmarkIds.has(listingId)) continue;

          const deadlineStr = listing.RCRIT_PBLANC_DE || listing.rcrit_pblanc_de || '';
          if (!deadlineStr) continue;

          const deadline = new Date(deadlineStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
          const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
          const name = listing.HOUSE_NM || listing.house_nm || '청약 공고';

          if (diffDays === 3) {
            await sendPush(fcm_token, '청약 마감 D-3 ⏰', `${name} 마감이 3일 남았어요!`, { listingId, screen: 'detail' });
            results.sent++;
          } else if (diffDays === 1) {
            await sendPush(fcm_token, '청약 마감 내일! 🚨', `${name} 마감이 내일이에요!`, { listingId, screen: 'detail' });
            results.sent++;
          }
        }
      } catch(e) {
        results.errors++;
      }
    }

    return res.status(200).json({ message: '완료', results });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
