// api/sync-listings.js
// 청약홈 신규 공고 자동 감지 → PDF 다운로드 → Claude AI 파싱 → Redis 저장
// Vercel Cron으로 하루 4회 실행 (vercel.json 설정 필요)

export const maxDuration = 60;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const REDIS_URL = process.env.KV_REST_API_URL;
  const REDIS_TOKEN = process.env.KV_REST_API_TOKEN;
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

  if (!REDIS_URL || !REDIS_TOKEN || !ANTHROPIC_KEY) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  const log = [];
  const results = { detected: 0, skipped: 0, added: 0, errors: [] };

  try {
    // 1. Redis에서 기존 공고 목록 로드
    const redisRes = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['GET', 'admin_listings'])
    });
    const redisData = await redisRes.json();
    const existingListings = redisData.result ? JSON.parse(redisData.result) : [];
    const existingIds = new Set(existingListings.map(l => String(l.id)));

    log.push(`기존 공고 ${existingListings.length}건 로드`);

    // 2. 청약홈 공고 목록 HTML fetch
    const listHtml = await fetch('https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ChengyakBot/1.0)' }
    }).then(r => r.text()).catch(() => null);

    if (!listHtml) {
      return res.status(500).json({ error: '청약홈 접속 실패' });
    }

    // 3. HTML에서 공고 정보 파싱
    // houseManageNo, pblancNo, atchmnflSeqNo 추출
    const announcements = parseAnnouncementList(listHtml);
    results.detected = announcements.length;
    log.push(`청약홈에서 ${announcements.length}건 감지`);

    // 4. 신규 공고만 필터링
    const newAnnouncements = announcements.filter(a => !existingIds.has(String(a.houseManageNo)));
    log.push(`신규 공고 ${newAnnouncements.length}건`);

    // 5. 신규 공고 처리 (최대 5건씩)
    const toProcess = newAnnouncements.slice(0, 5);

    for (const ann of toProcess) {
      try {
        log.push(`처리 중: ${ann.name} (${ann.houseManageNo})`);

        // 상세 팝업 API 호출해서 atchmnflSeqNo 가져오기
        const detailForm = new URLSearchParams({
          houseManageNo: ann.houseManageNo,
          pblancNo: ann.pblancNo
        });
        const detailRes = await fetch('https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancDetail.do', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (compatible; ChengyakBot/1.0)',
            'Referer': 'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do'
          },
          body: detailForm.toString()
        });
        const detailHtml = await detailRes.text();

        // atchmnflSeqNo 추출 (getAtchmfl.do 링크에서)
        const seqMatch = detailHtml.match(/atchmnflSeqNo=(\d+)/);
        if (!seqMatch) {
          // 디버그: 상세 HTML 앞부분 로그
          log.push(`상세 HTML 미리보기: ${detailHtml.slice(0, 300).replace(/\n/g,' ')}`);
          throw new Error('PDF 링크를 찾을 수 없어요');
        }
        const atchmnflSeqNo = seqMatch[1];

        // PDF URL 구성 및 다운로드
        const pdfUrl = `https://static.applyhome.co.kr/ai/aia/getAtchmfl.do?houseManageNo=${ann.houseManageNo}&pblancNo=${ann.pblancNo}&atchmnflSeqNo=${atchmnflSeqNo}&atchmnflSn=2`;
        log.push(`atchmnflSeqNo: ${atchmnflSeqNo}, PDF URL: ${pdfUrl}`);
        const pdfBuffer = await fetch(pdfUrl).then(r => {
          if (!r.ok) throw new Error(`PDF 다운로드 실패: ${r.status}`);
          return r.arrayBuffer();
        });

        const base64 = Buffer.from(pdfBuffer).toString('base64');
        log.push(`PDF 다운로드 완료: ${Math.round(base64.length / 1024)}KB`);

        // Claude API로 파싱
        const parsed = await parsePdfWithClaude(base64, ANTHROPIC_KEY);
        if (!parsed) throw new Error('AI 파싱 실패');

        // listings.js와 동일한 형식으로 저장
        const listing = buildListing(parsed, ann);
        existingListings.unshift(listing);
        existingIds.add(String(listing.id));
        results.added++;

        log.push(`✓ 저장: ${listing.name}`);

      } catch (e) {
        results.errors.push({ name: ann.name, error: e.message });
        log.push(`✗ 실패: ${ann.name} — ${e.message}`);
      }
    }

    results.skipped = newAnnouncements.length - toProcess.length;

    // 6. Redis 업데이트
    if (results.added > 0) {
      await fetch(REDIS_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['SET', 'admin_listings', JSON.stringify(existingListings)])
      });
      log.push(`Redis 업데이트 완료`);
    }

    return res.status(200).json({ ok: true, results, log });

  } catch (e) {
    return res.status(500).json({ error: e.message, log });
  }
}

// ── 청약홈 HTML 파싱 ──
function parseAnnouncementList(html) {
  const announcements = [];

  // data-hmno, data-pbno 속성에서 추출
  const rowRegex = /data-hmno="(\d+)"[^>]*data-pbno="(\d+)"|data-pbno="(\d+)"[^>]*data-hmno="(\d+)"/g;
  let match;
  while ((match = rowRegex.exec(html)) !== null) {
    const hmno = match[1] || match[4];
    const pbno = match[2] || match[3];
    if (!hmno || !pbno) continue;

    // 해당 tr 블록에서 단지명 추출
    const trStart = html.lastIndexOf('<tr', match.index);
    const trEnd = html.indexOf('</tr>', match.index) + 5;
    const trBlock = html.slice(trStart, trEnd);
    const nameMatch = trBlock.match(/class="txt_l_b"[^>]*>([\s\S]*?)<\/a>/) ||
                      trBlock.match(/class="[^"]*houseName[^"]*"[^>]*>([\s\S]*?)<\/a>/);
    const name = nameMatch
      ? nameMatch[1].replace(/<[^>]+>/g, '').trim()
      : `공고_${hmno}`;

    announcements.push({ houseManageNo: hmno, pblancNo: pbno, name });
  }

  // 중복 제거
  const seen = new Set();
  return announcements.filter(a => {
    if (seen.has(a.houseManageNo)) return false;
    seen.add(a.houseManageNo);
    return true;
  });
}

// ── Claude API로 PDF 파싱 ──
async function parsePdfWithClaude(base64, apiKey) {
  const prompt = `다음 청약 공고문 PDF를 꼼꼼하게 분석해서 JSON 형식으로만 응답해줘. 마크다운 코드블록 없이 순수 JSON만.

{
  "name": "단지명",
  "loc": "공급위치 주소 (법정동 주소)",
  "region": "지역코드 (seoul/gyeonggi/incheon/busan/daejeon/sejong/daegu/gwangju/ulsan/gangwon/chungnam/jeonnam 중 하나)",
  "type": "public 또는 private",
  "price": "평형별 분양가 (| 구분)",
  "minP": 전체 평형 중 최저 분양가 만원 단위 숫자,
  "deadline": "청약 접수 마감일 YYYY-MM-DD",
  "size": "공급 면적",
  "units": 총 세대수 숫자,
  "aS": "청약 접수 시작일 YYYY-MM-DD",
  "aE": "청약 접수 종료일 YYYY-MM-DD",
  "aD": "당첨자 발표일 YYYY-MM-DD",
  "sched": "접수: YYYY-MM-DD ~ YYYY-MM-DD / 발표: YYYY-MM-DD",
  "elig": ["공급유형 배열. 예: 신혼부부특공/생애최초/일반공급 등"],
  "qual": "신청 자격 핵심 요약",
  "inc": "소득 기준 핵심 요약",
  "downPct": 계약금 비율 숫자 (없으면 10)
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
          { type: 'text', text: prompt }
        ]
      }]
    })
  });

  const data = await response.json();
  if (!data.content) return null;

  let text = data.content.map(c => c.text || '').join('');
  text = text.replace(/```json|```/g, '').trim();
  const s = text.indexOf('{'), e = text.lastIndexOf('}');
  if (s < 0 || e <= s) return null;

  try {
    return JSON.parse(text.slice(s, e + 1).replace(/,\s*([\]}])/g, '$1'));
  } catch {
    return null;
  }
}

// ── listings.js와 동일한 형식으로 공고 객체 생성 ──
function buildListing(parsed, ann) {
  const now = new Date().toISOString();
  const kst = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const today = new Date(kst.getFullYear(), kst.getMonth(), kst.getDate());

  // days 계산
  let days = null;
  if (parsed.aE && !String(parsed.aE).startsWith('9999')) {
    const dp = String(parsed.aE).slice(0, 10).split('-');
    const end = new Date(parseInt(dp[0]), parseInt(dp[1]) - 1, parseInt(dp[2]));
    days = Math.ceil((end - today) / 86400000);
  }

  return {
    id: ann.houseManageNo,
    name: parsed.name || ann.name,
    loc: parsed.loc || '',
    region: parsed.region || '',
    type: parsed.type || 'private',
    lotto: false,
    price: parsed.price || '공고 확인 필요',
    minP: parsed.minP || 0,
    mktP: 0,
    noMktP: true,
    deadline: parsed.aE || parsed.deadline || '',
    days: days,
    size: parsed.size || '',
    units: parsed.units || 0,
    comp: 0,
    cut: 0,
    qual: parsed.qual || '',
    inc: parsed.inc || '',
    sched: parsed.sched || '',
    aS: parsed.aS || '',
    aE: parsed.aE || '',
    aD: parsed.aD || '',
    elig: parsed.elig || ['일반공급'],
    eligDetail: parsed.eligDetail || [],
    eligTiers: parsed.eligTiersData || [],
    priceFactors: [],
    downPct: parsed.downPct || 10,
    _src: 'auto',
    _syncedAt: now,
    _houseManageNo: ann.houseManageNo,
    _pblancNo: ann.pblancNo
  };
}
