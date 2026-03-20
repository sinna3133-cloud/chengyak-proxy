// api/listings.js
module.exports = async function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘GET, POST, DELETE, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);
if (req.method === ‘OPTIONS’) return res.status(200).end();

const REDIS_URL = process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
return res.status(500).json({ error: ‘Redis 환경변수가 없어요.’ });
}

const redisReq = async (cmd) => {
const r = await fetch(`${REDIS_URL}/${cmd.join('/')}`, {
headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
});
return r.json();
};

try {
// GET: 공고 목록 불러오기
if (req.method === ‘GET’) {
const result = await redisReq([‘get’, ‘admin_listings’]);
const listings = result.result ? JSON.parse(result.result) : [];
return res.status(200).json({ listings });
}

```
// POST: 공고 저장
if (req.method === 'POST') {
  const { listing } = req.body;
  if (!listing) return res.status(400).json({ error: '공고 데이터가 없어요.' });

  const result = await redisReq(['get', 'admin_listings']);
  const listings = result.result ? JSON.parse(result.result) : [];

  // 중복 체크
  const isDup = listings.some(l => l.name === listing.name);
  if (isDup && !req.body.force) {
    return res.status(409).json({ duplicate: true, message: '이미 동일 공고가 등록되어 있어요.' });
  }

  listings.unshift(listing);
  await redisReq(['set', 'admin_listings', encodeURIComponent(JSON.stringify(listings))]);
  return res.status(200).json({ success: true, listings });
}

// DELETE: 공고 삭제
if (req.method === 'DELETE') {
  const { id } = req.body;
  const result = await redisReq(['get', 'admin_listings']);
  const listings = result.result ? JSON.parse(result.result) : [];
  const updated = listings.filter(l => l.id !== id);
  await redisReq(['set', 'admin_listings', encodeURIComponent(JSON.stringify(updated))]);
  return res.status(200).json({ success: true, listings: updated });
}
```

} catch (e) {
return res.status(500).json({ error: e.message });
}
};