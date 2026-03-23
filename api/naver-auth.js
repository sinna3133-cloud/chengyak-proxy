/**

- api/naver-auth.js
- 네이버 로그인 토큰 교환 + 사용자 정보 조회
  */
  module.exports = async function handler(req, res) {
  res.setHeader(‘Access-Control-Allow-Origin’, ’*’);
  res.setHeader(‘Access-Control-Allow-Methods’, ‘GET, POST, OPTIONS’);
  res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);
  if (req.method === ‘OPTIONS’) return res.status(200).end();

const CLIENT_ID     = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const REDIRECT_URI  = req.query.redirect_uri || process.env.NAVER_REDIRECT_URI || ‘https://chengyak-proxy.vercel.app/’;

if (!CLIENT_ID || !CLIENT_SECRET) {
return res.status(500).json({ error: ‘NAVER 환경변수 미설정’ });
}

try {
const code  = req.query.code || req.body?.code;
const state = req.query.state || req.body?.state;
if (!code) return res.status(400).json({ error: ‘code 없음’ });

```
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

return res.status(200).json({
  naverId: String(id),
  nickname: name || '사용자',
  accessToken,
});
```

} catch (e) {
return res.status(500).json({ error: e.message });
}
};