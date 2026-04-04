/**
 * api/kakao-auth.js
 * 카카오 로그인 토큰 교환 + 사용자 정보 조회
 *
 * GET  /api/kakao-auth?code=xxx             → 토큰 교환 → 사용자 정보 반환
 * GET  /api/kakao-auth?code=xxx&state=app   → 앱용: 토큰 교환 후 앱으로 리다이렉트
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const CLIENT_ID     = process.env.KAKAO_CLIENT_ID;
  const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET || '';

  if (!CLIENT_ID) {
    return res.status(500).json({ error: 'KAKAO 환경변수 미설정' });
  }

  try {
    if (req.query.debug) return res.status(200).json({ CLIENT_ID });

    const code  = req.query.code || req.body?.code;
    const state = req.query.state || req.body?.state || '';
    if (!code) return res.status(400).json({ error: 'code 없음' });

    const isApp = req.query.app === '1' || state.includes('app');

    // 카카오 콘솔 등록값과 항상 동일하게 고정
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

    // ── 앱 환경: 앱으로 리다이렉트 ──
    if (isApp) {
      const params = new URLSearchParams({ kakaoId, nickname, avatar, accessToken });
      return res.redirect(302, `kakaoe7389d2463e1980b32b680910e373f5e://oauth?${params.toString()}`);
    }

    // ── 웹 환경: JSON 반환 ──
    return res.status(200).json({ kakaoId, nickname, avatar, accessToken });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
