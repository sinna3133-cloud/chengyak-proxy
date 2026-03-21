/**
 * 국토부 실거래가 API → 주변 시세(mktP) 자동 조회
 *
 * 사용법: GET /api/market-price?dong=서초동&gu=서초구&size=84
 *
 * 국토부 아파트 실거래가 상세 조회 API
 * https://www.data.go.kr/data/15057511/openapi.do
 *
 * 환경변수: MOLIT_API_KEY (국토부 공공데이터 API 인증키, Decoding 키)
 */

// 구/군 → 법정동코드(5자리) 매핑
const LAWD_MAP = {
  // 서울
  '종로구':'11110','중구':'11140','용산구':'11170','성동구':'11200',
  '광진구':'11215','동대문구':'11230','중랑구':'11260','성북구':'11290',
  '강북구':'11305','도봉구':'11320','노원구':'11350','은평구':'11380',
  '서대문구':'11410','마포구':'11440','양천구':'11470','강서구':'11500',
  '구로구':'11530','금천구':'11545','영등포구':'11560','동작구':'11590',
  '관악구':'11620','서초구':'11650','강남구':'11680','송파구':'11710',
  '강동구':'11740',
  // 경기 주요
  '수원시장안구':'41111','수원시권선구':'41113','수원시팔달구':'41115',
  '수원시영통구':'41117','성남시수정구':'41131','성남시중원구':'41133',
  '성남시분당구':'41135','고양시덕양구':'41281','고양시일산동구':'41285',
  '고양시일산서구':'41287','용인시처인구':'41461','용인시기흥구':'41463',
  '용인시수지구':'41465','화성시':'41590','광교':'41117',
  '과천시':'41290','안양시만안구':'41171','안양시동안구':'41173',
  '하남시':'41450','광명시':'41210','의왕시':'41430',
  // 인천
  '부평구':'28237','미추홀구':'28177','남동구':'28200',
  '연수구':'28185','서구':'28260','계양구':'28245','중구':'28110',
  '동구':'28140','영종':'28710',
  // 부산
  '부산진구':'26230','해운대구':'26350','수영구':'26410',
  '남구':'26290','동래구':'26260','연제구':'26380',
  '사하구':'26380','금정구':'26320','북구':'26320',
  '사상구':'26440','강서구':'26440',
  // 대전
  '유성구':'30200','서구':'30170','중구':'30110','동구':'30140','대덕구':'30230',
  // 세종
  '세종시':'36110',
};

// 주소에서 구/군 추출
function extractGu(loc) {
  // "서울 서초구 반포동" → "서초구"
  // "경기 수원시 영통구" → "수원시영통구"
  // "부산광역시 부산진구 범천동" → "부산진구"
  const parts = loc.replace(/특별시|광역시|도/g, '').trim().split(/\s+/);

  // 시+구 형태 (수원시 영통구)
  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i].endsWith('시') && parts[i+1].endsWith('구')) {
      return parts[i] + parts[i+1];
    }
  }
  // 구 형태
  for (const p of parts) {
    if (p.endsWith('구') || p.endsWith('시')) return p;
  }
  return parts[1] || parts[0] || '';
}

// 주소에서 동 추출
function extractDong(loc) {
  const parts = loc.split(/\s+/);
  for (const p of parts) {
    if (p.endsWith('동') || p.endsWith('읍') || p.endsWith('면')) return p;
  }
  return '';
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.MOLIT_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'MOLIT_API_KEY not set' });

  const { loc, size, name } = req.query;
  // loc: "서울 서초구 반포동" 또는 gu/dong 직접 전달
  // size: 전용면적 (84 등)
  // name: 단지명 (선택, 더 정확한 매칭용)

  const gu = req.query.gu || extractGu(loc || '');
  const dong = req.query.dong || extractDong(loc || '');
  const lawdCd = LAWD_MAP[gu];

  if (!lawdCd) {
    return res.status(400).json({
      error: `법정동코드를 찾을 수 없어요: "${gu}"`,
      availableGu: Object.keys(LAWD_MAP).slice(0, 20)
    });
  }

  try {
    // 최근 6개월 실거래가 조회
    const now = new Date();
    const months = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(`${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`);
    }

    let allDeals = [];

    // 최근 3개월만 조회 (API 호출 최소화)
    for (const dealYmd of months.slice(0, 3)) {
      const url = `http://openapi.molit.go.kr/OpenAPI_ToolInstall498/service/rest/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev`
        + `?serviceKey=${encodeURIComponent(apiKey)}`
        + `&LAWD_CD=${lawdCd}`
        + `&DEAL_YMD=${dealYmd}`
        + `&pageNo=1&numOfRows=100`;

      const response = await fetch(url);
      const text = await response.text();

      // XML 파싱 (간단한 정규식)
      const items = text.match(/<item>([\s\S]*?)<\/item>/g) || [];

      for (const item of items) {
        const get = (tag) => {
          const m = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
          return m ? m[1].trim() : '';
        };

        const aptNm = get('aptNm') || get('아파트');
        const excluUseAr = parseFloat(get('excluUseAr') || get('전용면적') || '0');
        const dealAmount = get('dealAmount') || get('거래금액') || '0';
        const dealAmountNum = parseInt(dealAmount.replace(/,/g, '').trim());
        const jibun = get('jibun') || get('지번') || '';
        const dealDay = get('dealDay') || get('일') || '';
        const dealMonth = get('dealMonth') || get('월') || dealYmd.slice(4);
        const dealYear = get('dealYear') || get('년') || dealYmd.slice(0, 4);
        const umdNm = get('umdNm') || get('법정동') || '';

        if (aptNm && dealAmountNum > 0) {
          allDeals.push({
            name: aptNm,
            size: excluUseAr,
            price: dealAmountNum, // 만원 단위
            dong: umdNm,
            jibun,
            date: `${dealYear}-${String(dealMonth).padStart(2, '0')}-${String(dealDay).padStart(2, '0')}`,
          });
        }
      }
    }

    // 필터링
    const targetSize = parseFloat(size || '84');
    const sizeRange = 10; // ±10㎡

    let filtered = allDeals;

    // 동 필터
    if (dong) {
      const dongFiltered = allDeals.filter(d => d.dong.includes(dong.replace(/동$/, '')));
      if (dongFiltered.length > 0) filtered = dongFiltered;
    }

    // 면적 필터
    const sizeFiltered = filtered.filter(d =>
      Math.abs(d.size - targetSize) <= sizeRange
    );
    if (sizeFiltered.length > 0) filtered = sizeFiltered;

    // 단지명 매칭 (있으면 우선)
    if (name) {
      const nameKeywords = name.replace(/[0-9A-Za-z]/g, '').split(/\s+/).filter(w => w.length >= 2);
      const nameFiltered = filtered.filter(d =>
        nameKeywords.some(kw => d.name.includes(kw))
      );
      if (nameFiltered.length > 0) filtered = nameFiltered;
    }

    // 시세 산출 (최근 거래 기준 중위값)
    filtered.sort((a, b) => b.date.localeCompare(a.date));
    const recent = filtered.slice(0, 20);

    if (recent.length === 0) {
      return res.json({
        mktP: null,
        message: `${gu} ${dong} 주변 ${targetSize}㎡ 실거래 데이터가 없어요`,
        totalDeals: allDeals.length,
        lawdCd,
      });
    }

    const prices = recent.map(d => d.price).sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const max = prices[prices.length - 1];
    const min = prices[0];

    return res.json({
      mktP: median,        // 중위 시세 (만원)
      avg,                  // 평균
      max,                  // 최고가
      min,                  // 최저가
      sampleCount: recent.length,
      recentDeals: recent.slice(0, 5).map(d => ({
        name: d.name,
        size: d.size,
        price: d.price,
        date: d.date,
      })),
      query: { gu, dong, size: targetSize, lawdCd },
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
