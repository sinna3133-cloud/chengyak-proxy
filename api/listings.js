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

// Upstash REST API 헬퍼
const redis = async (command, …args) => {
const r = await fetch(REDIS_URL, {
method: ‘POST’,
headers: {
Authorization: `Bearer ${REDIS_TOKEN}`,
‘Content-Type’: ‘application/json’
},
body: JSON.stringify([command, …args])
});
const data = await r.json();
return data.result;
};

try {
// GET: 공고 목록 불러오기
if (req.method === ‘GET’) {
const raw = await redis(‘GET’, ‘admin_listings’);
const listings = raw ? JSON.parse(raw) : [];
return res.status(200).json({ listings });
}

```
// POST: 공고 저장
if (req.method === 'POST') {
  const { listing, force } = req.body;
  if (!listing) return res.status(400).json({ error: '공고 데이터가 없어요.' });

  const raw = await redis('GET', 'admin_listings');
  const listings = raw ? JSON.parse(raw) : [];

  // 중복 체크
  const isDup = listings.some(l => l.name === listing.name);
  if (isDup && !force) {
    return res.status(409).json({ duplicate: true, message: '이미 동일 공고가 등록되어 있어요.' });
  }

  listings.unshift(listing);
  await redis('SET', 'admin_listings', JSON.stringify(listings));
  return res.status(200).json({ success: true, listings });
}

// DELETE: 공고 삭제
if (req.method === 'DELETE') {
  const { id } = req.body;
  const raw = await redis('GET', 'admin_listings');
  const listings = raw ? JSON.parse(raw) : [];
  const updated = listings.filter(l => l.id !== id);
  await redis('SET', 'admin_listings', JSON.stringify(updated));
  return res.status(200).json({ success: true, listings: updated });
}

return res.status(405).json({ error: 'Method not allowed' });
```

} catch (e) {
return res.status(500).json({ error: e.message });
}
};