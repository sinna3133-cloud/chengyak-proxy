/**
 * 국토부 실거래가 + 카카오 지오코딩 → 반경 1km 시세 자동 조회
 *
 * GET /api/market-price?loc=서울 서초구 반포동&size=84&name=래미안원베일리
 *
 * 환경변수:
 *   MOLIT_API_KEY  — 국토부 공공데이터 API 인증키 (Decoding 키)
 *   KAKAO_REST_KEY — 카카오 REST API 키
 */

// 구/군 → 법정동코드(5자리)
const LAWD_MAP = {
  // 서울
  '종로구':'11110','중구':'11140','용산구':'11170','성동구':'11200',
  '광진구':'11215','동대문구':'11230','중랑구':'11260','성북구':'11290',
  '강북구':'11305','도봉구':'11320','노원구':'11350','은평구':'11380',
  '서대문구':'11410','마포구':'11440','양천구':'11470','강서구':'11500',
  '구로구':'11530','금천구':'11545','영등포구':'11560','동작구':'11590',
  '관악구':'11620','서초구':'11650','강남구':'11680','송파구':'11710','강동구':'11740',
  // 경기 주요
  '수원시장안구':'41111','수원시권선구':'41113','수원시팔달구':'41115','수원시영통구':'41117',
  '성남시수정구':'41131','성남시중원구':'41133','성남시분당구':'41135',
  '고양시덕양구':'41281','고양시일산동구':'41285','고양시일산서구':'41287',
  '용인시처인구':'41461','용인시기흥구':'41463','용인시수지구':'41465',
  '화성시':'41590','과천시':'41290','하남시':'41450','광명시':'41210',
  '안양시만안구':'41171','안양시동안구':'41173','의왕시':'41430',
  '평택시':'41220','김포시':'41570','파주시':'41480','남양주시':'41360',
  '구리시':'41310','시흥시':'41390','안산시상록구':'41271','안산시단원구':'41273',
  '의정부시':'41150','양주시':'41630',
  // 인천
  '부평구':'28237','미추홀구':'28177','남동구':'28200','연수구':'28185',
  '서구':'28260','계양구':'28245','중구':'28110','동구':'28140',
  // 부산
  '부산진구':'26230','해운대구':'26350','수영구':'26410','남구':'26290',
  '동래구':'26260','연제구':'26380','사하구':'26530','금정구':'26320',
  '북구':'26440','사상구':'26500','강서구':'26440',
  // 대전
  '유성구':'30200','서구':'30170','중구':'30110','동구':'30140','대덕구':'30230',
  // 세종
  '세종시':'36110',
  // 대구
  '수성구':'27260','달서구':'27290','북구':'27230','중구':'27110',
  // 광주
  '광산구':'29200','북구':'29170','서구':'29140',
  // 충남/충북
  '천안시서북구':'44133','천안시동남구':'44131','청주시상당구':'43111','청주시서원구':'43112',
};

// 주소 → 구 추출
function extractGu(loc) {
  const clean = loc.replace(/특별시|광역시|특별자치시|특별자치도|도\s/g, '').trim();
  const parts = clean.split(/\s+/);
  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i].endsWith('시') && parts[i+1].endsWith('구')) return parts[i] + parts[i+1];
  }
  for (const p of parts) {
    if (p.endsWith('구')) return p;
    if (p.endsWith('시') && !p.includes('광역') && !p.includes('특별')) return p;
  }
  return parts[1] || '';
}

// 두 좌표 간 거리 (km) — Haversine
function distKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// 카카오 지오코딩: 주소 → {lat, lng}
async function geocode(address, kakaoKey) {
  // 1) 키워드 검색 먼저 (아파트명 포함 시 더 정확)
  try {
    const url1 = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(address)}`;
    const res1 = await fetch(url1, { headers: { 'Authorization': `KakaoAK ${kakaoKey}` } });
    const data1 = await res1.json();
    if (data1.documents && data1.documents.length > 0) {
      return { lat: parseFloat(data1.documents[0].y), lng: parseFloat(data1.documents[0].x) };
    }
  } catch(e) {}

  // 2) 주소 검색 fallback
  try {
    const url2 = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
    const res2 = await fetch(url2, { headers: { 'Authorization': `KakaoAK ${kakaoKey}` } });
    const data2 = await res2.json();
    if (data2.documents && data2.documents.length > 0) {
      return { lat: parseFloat(data2.documents[0].y), lng: parseFloat(data2.documents[0].x) };
    }
  } catch(e) {}

  return null;
}

// 아파트명 → 좌표 (캐시용)
const geoCache = {};
async function geocodeApt(aptName, dong, gu, kakaoKey) {
  const key = `${gu} ${dong} ${aptName}`;
  if (geoCache[key]) return geoCache[key];
  const result = await geocode(key, kakaoKey);
  if (result) geoCache[key] = result;
  return result;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const molitKey = process.env.MOLIT_API_KEY;
  const kakaoKey = process.env.KAKAO_REST_KEY;
  if (!molitKey) return res.status(500).json({ error: 'MOLIT_API_KEY not set' });
  if (!kakaoKey) return res.status(500).json({ error: 'KAKAO_REST_KEY not set' });

  const { loc, size, name, radius } = req.query;
  const radiusKm = parseFloat(radius) || 1; // 기본 반경 1km

  if (!loc) return res.status(400).json({ error: 'loc parameter required (예: 서울 서초구 반포동)' });

  const gu = req.query.gu || extractGu(loc);
  const lawdCd = LAWD_MAP[gu];
  if (!lawdCd) {
    return res.status(400).json({ error: `법정동코드를 찾을 수 없어요: "${gu}"` });
  }

  try {
    // 1단계: 공고 위치 좌표 확인 (여러 검색어 시도)
    const queries = [];
    if (name) queries.push(name, `${loc} ${name}`, `${gu} ${name}`);
    queries.push(loc);

    let targetCoord = null;
    let matchedQuery = '';
    for (const q of queries) {
      targetCoord = await geocode(q, kakaoKey);
      if (targetCoord) { matchedQuery = q; break; }
    }

    if (!targetCoord) {
      return res.status(400).json({
        error: `주소 좌표를 찾을 수 없어요`,
        tried: queries,
        hint: 'KAKAO_REST_KEY가 유효한지, 카카오 앱에서 REST API 활성화했는지 확인하세요'
      });
    }

    // 2단계: 국토부 실거래가 조회 (최근 3개월)
    const now = new Date();
    let allDeals = [];

    for (let i = 0; i < 3; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const dealYmd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`;

      const url = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev`
        + `?serviceKey=${encodeURIComponent(molitKey)}`
        + `&LAWD_CD=${lawdCd}&DEAL_YMD=${dealYmd}&pageNo=1&numOfRows=200`;

      const response = await fetch(url);
      const text = await response.text();
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
        const umdNm = get('umdNm') || get('법정동') || '';
        const jibun = get('jibun') || get('지번') || '';
        const dealYear = get('dealYear') || get('년') || dealYmd.slice(0, 4);
        const dealMonth = get('dealMonth') || get('월') || dealYmd.slice(4);
        const dealDay = get('dealDay') || get('일') || '1';

        if (aptNm && dealAmountNum > 0) {
          allDeals.push({
            name: aptNm, size: excluUseAr, price: dealAmountNum,
            dong: umdNm, jibun,
            date: `${dealYear}-${String(dealMonth).padStart(2, '0')}-${String(dealDay).padStart(2, '0')}`,
          });
        }
      }
    }

    if (allDeals.length === 0) {
      // 디버깅: 마지막 API 응답 일부 표시
      const lastUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev`
        + `?serviceKey=${encodeURIComponent(molitKey)}`
        + `&LAWD_CD=${lawdCd}&DEAL_YMD=${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}&pageNo=1&numOfRows=5`;
      const debugRes = await fetch(lastUrl);
      const debugText = await debugRes.text();
      return res.json({ mktP: null, message: '실거래 데이터가 없어요', query: { gu, lawdCd }, debug: debugText.slice(0, 500) });
    }

    // 3단계: 면적 필터 (±10㎡)
    const targetSize = parseFloat(size || '84');
    let filtered = allDeals.filter(d => Math.abs(d.size - targetSize) <= 10);
    if (filtered.length === 0) filtered = allDeals; // 면적 매칭 안 되면 전체

    // 4단계: 각 거래의 아파트 좌표 조회 → 반경 필터
    // 유니크 아파트명 추출 (API 호출 최소화)
    const uniqueApts = [...new Set(filtered.map(d => `${d.dong}|${d.name}`))];

    // 최대 30개 아파트까지만 좌표 조회
    const aptCoords = {};
    for (const key of uniqueApts.slice(0, 30)) {
      const [dong, aptName] = key.split('|');
      const coord = await geocodeApt(aptName, dong, gu, kakaoKey);
      if (coord) aptCoords[key] = coord;
    }

    // 반경 필터
    const withinRadius = filtered.filter(d => {
      const key = `${d.dong}|${d.name}`;
      const coord = aptCoords[key];
      if (!coord) return false;
      return distKm(targetCoord.lat, targetCoord.lng, coord.lat, coord.lng) <= radiusKm;
    });

    // 반경 내 결과가 너무 적으면 동 단위로 fallback
    const results = withinRadius.length >= 3 ? withinRadius : filtered;
    const usedRadius = withinRadius.length >= 3;

    // 5단계: 시세 산출 (중위값)
    results.sort((a, b) => b.date.localeCompare(a.date));
    const recent = results.slice(0, 30);
    const prices = recent.map(d => d.price).sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

    return res.json({
      mktP: median,
      avg,
      max: prices[prices.length - 1],
      min: prices[0],
      sampleCount: recent.length,
      radiusUsed: usedRadius ? `${radiusKm}km` : `${gu} 전체 (반경 내 데이터 부족)`,
      targetCoord,
      recentDeals: recent.slice(0, 5).map(d => ({
        name: d.name, size: d.size, price: d.price, date: d.date,
        dist: aptCoords[`${d.dong}|${d.name}`]
          ? distKm(targetCoord.lat, targetCoord.lng, aptCoords[`${d.dong}|${d.name}`].lat, aptCoords[`${d.dong}|${d.name}`].lng).toFixed(2) + 'km'
          : '?',
      })),
      query: { gu, size: targetSize, radius: radiusKm, lawdCd },
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
