export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url 파라미터가 필요해요' });
  const ALLOWED = ['api.odcloud.kr','openapi.gg.go.kr','openapi.seoul.go.kr','dapi.kakao.com','apis.data.go.kr','api.anthropic.com'];
  let target;
  try { target = new URL(decodeURIComponent(url)); } 
  catch { return res.status(400).json({ error: '유효하지 않은 URL' }); }
  if (!ALLOWED.some(h => target.hostname === h))
    return res.status(403).json({ error: '허용되지 않은 도메인' });
  try {
     const kakaoAuth = target.hostname === 'dapi.kakao.com'
      ? { 'Authorization': 'KakaoAK 5ebbb3bfdafac23bc229d28977d4bdaa' } : {};
    const r = await fetch(target.toString(), {
      method: req.method === 'POST' ? 'POST' : 'GET',
      headers: { 
        'Accept': 'application/json', 
        'User-Agent': 'cheongyak-proxy/1.0', 
        'Content-Type': 'application/json',
        ...kakaoAuth 
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });
    const ct = r.headers.get('content-type') || '';
    const data = ct.includes('json') ? await r.json() : await r.text();
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(r.status).json(data);
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
