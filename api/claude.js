// api/claude.js
export const maxDuration = 30;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: { message: 'ANTHROPIC_API_KEY 환경변수가 없어요' } });
    }

    // 모델명 강제 고정 (클라이언트 요청 무시)
    const body = { ...req.body, model: 'claude-haiku-4-5-20251001' };

    console.log('[claude] model:', body.model, '| max_tokens:', body.max_tokens);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log('[claude] status:', response.status, '| error:', data.error?.message || 'none');
    return res.status(response.status).json(data);
  } catch (e) {
    console.error('[claude] catch:', e.message);
    return res.status(500).json({ error: { message: e.message || '서버 오류가 발생했어요.' } });
  }
}
