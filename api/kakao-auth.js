/**
 * api/kakao-auth.js
 * 카카오 로그인 토큰 교환 + 사용자 정보 조회
 *
 * [앱 환경]  카카오 인증 후 state=app 으로 돌아옴
 *            → 토큰 교환 → 앱 커스텀 스킴으로 리다이렉트
 *
 * [웹 환경]  카카오 인증 후 state 없거나 state=web 으로 돌아옴
 *            → 토큰 교환 → 원래 사이트로 ?code 없이 사용자 정보 쿼리스트링으로 리다이렉트
 *            (브라우저가 JSON 페이지에 멈추는 문제 해결)
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const CLIENT_ID     = process.env.KAKAO_CLIENT_ID;
  const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET || '';
  // 웹 환경에서 로그인 후 돌아올 프론트엔드 주소
  const WEB_ORIGIN    = process.env.WEB_ORIGIN || 'https://chengyak.vercel.app';

  if (!CLIENT_ID) {
    return res.status(500).json({ error: 'KAKAO 환경변수 미설정' });
  }

  try {
    const code  = req.query.code || req.body?.code;
    const state = req.query.state || req.body?.state || '';
    if (!code) return res.status(400).json({ error: 'code 없음' });

    // ✅ 버그1 수정: includes('app') → 정확히 일치 비교
    // includes를 쓰면 'webapp', 'kapplication' 등도 앱으로 오인됨
    const isApp = state === 'app';

    // redirect_uri는 카카오 콘솔 등록값과 항상 동일하게 고정
    const REDIRECT_URI = 'https://chengyak-proxy.vercel.app/api/kakao-auth';

    // 1단계: code → access_token
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'authorization_code',
        client_id:     CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri:  REDIRECT_URI,
        code,
      }),
    });
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || tokenData.error });
    }

    const accessToken = tokenData.access_token;

    // 2단계: access_token → 사용자 정보
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userData = await userRes.json();

    const kakaoId  = String(userData.id);
    const nickname = userData.kakao_account?.profile?.nickname || '사용자';
    const avatar   = userData.kakao_account?.profile?.thumbnail_image_url || '';

    // ── 앱 환경: 커스텀 스킴으로 앱에 전달 ──
    if (isApp) {
      const params = new URLSearchParams({ kakaoId, nickname, avatar, accessToken });
      return res.redirect(302, `kakaoe7389d2463e1980b32b680910e373f5e://oauth?${params.toString()}`);
    }

    // ── 웹 환경 ──
    // ✅ 버그2 수정: JSON 반환 → 원래 사이트로 redirect
    // 기존 JSON 반환 방식은 브라우저가 JSON 페이지에서 멈춰버려서 로그인이 완료되지 않음
    const params = new URLSearchParams({ kakaoId, nickname, avatar, accessToken });
    return res.redirect(302, `${WEB_ORIGIN}?kakaoLogin=1&${params.toString()}`);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
