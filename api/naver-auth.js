/**
 * api/naver-auth.js
 * 네이버 로그인 토큰 교환 + 사용자 정보 조회
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const CLIENT_ID     = process.env.NAVER_CLIENT_ID;
  const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: 'NAVER 환경변수 미설정' });
  }

  try {
    const code  = req.query.code || req.body?.code;
    const state = req.query.state || req.body?.state || '';
    if (!code) return res.status(400).json({ error: 'code 없음' });

    const isApp = state.includes('app');

    // 네이버 콘솔 등록값과 항상 동일하게 고정
    const REDIRECT_URI = 'https://chengyak-proxy.vercel.app/api/naver-auth';

    // 1단계: code → access_token
    const tokenRes = await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code=${code}&state=${state}`,
      { method: 'GET' }
    );
    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || tokenData.error });
    }

    const accessToken = tokenData.access_token;

    // 2단계: access_token → 사용자 정보
    const userRes = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userBody = await userRes.json();
    if (userBody.resultcode !== '00') {
      return res.status(400).json({ error: '사용자 정보 조회 실패' });
    }

    const { id, name } = userBody.response;
    const naverId  = String(id);
    const nickname = name || '사용자';

    // 웹 환경에서 로그인 후 돌아올 프론트엔드 주소
    const WEB_ORIGIN = process.env.WEB_ORIGIN || 'https://chengyak-proxy.vercel.app';

    // ── 앱 환경: 앱 커스텀 스킴으로 리다이렉트 ──
    if (isApp) {
      const params = new URLSearchParams({ naverId, nickname, accessToken });
      return res.redirect(302, `kakaoe7389d2463e1980b32b680910e373f5e://naver-oauth?${params.toString()}`);
    }

    // ── 웹 환경: 원래 사이트로 302 redirect (브라우저가 JSON 페이지에서 멈추는 문제 해결) ──
    const params = new URLSearchParams({ naverId, nickname, accessToken });
    return res.redirect(302, `${WEB_ORIGIN}?naverLogin=1&${params.toString()}`);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
