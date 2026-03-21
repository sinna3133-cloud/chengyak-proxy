// api/listings.js
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const REDIS_URL = process.env.KV_REST_API_URL;
  const REDIS_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ error: 'Redis env missing' });
  }

  async function redis(command, key, value) {
    const body = value !== undefined ? [command, key, value] : [command, key];
    const r = await fetch(REDIS_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + REDIS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    return data.result;
  }

  try {
    if (req.method === 'GET') {
      const raw = await redis('GET', 'admin_listings');
      const listings = raw ? JSON.parse(raw) : [];
      return res.status(200).json({ listings: listings });
    }

    if (req.method === 'POST') {
      const listing = req.body.listing;
      const force = req.body.force;
      if (!listing) return res.status(400).json({ error: 'no listing' });

      const raw = await redis('GET', 'admin_listings');
      const listings = raw ? JSON.parse(raw) : [];

      function normName(s) {
        return (s || '')
          .replace(/[\s\u00A0\u3000\u200B]+/g, '')
          .replace(/공공분양주택/g, '')
          .replace(/\(.*?\)/g, '')
          .normalize('NFC')
          .toLowerCase();
      }

      const dupIdx = listings.findIndex(function(l) {
        return String(l.id) === String(listing.id) || normName(l.name) === normName(listing.name);
      });

      if (dupIdx > -1 && !force) {
        return res.status(409).json({ duplicate: true });
      }

      if (dupIdx > -1 && force) {
        // PDF 내용으로 기존 공고 덮어쓰기 (id, mktP 유지)
        var old = listings[dupIdx];
        listings[dupIdx] = Object.assign({}, listing, {
          id: old.id,
          mktP: listing.mktP || old.mktP || 0,
          _src: 'pdf',
          _updatedAt: new Date().toISOString()
        });
        await redis('SET', 'admin_listings', JSON.stringify(listings));
        return res.status(200).json({ overwritten: true, listings: [listings[dupIdx]] });
      }

      listings.unshift(listing);
      await redis('SET', 'admin_listings', JSON.stringify(listings));
      return res.status(200).json({ success: true, listings: listings });
    }

    if (req.method === 'DELETE') {
      const id = req.body.id;
      const raw = await redis('GET', 'admin_listings');
      const listings = raw ? JSON.parse(raw) : [];
      const updated = listings.filter(function(l) { return l.id !== id; });
      await redis('SET', 'admin_listings', JSON.stringify(updated));
      return res.status(200).json({ success: true, listings: updated });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
