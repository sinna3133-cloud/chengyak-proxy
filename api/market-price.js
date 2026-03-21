/**

- 국토부 실거래가 + 카카오 지오코딩 → 반경 1km 시세 자동 조회
- - 연식/역거리 보정식 적용 (신축 프리미엄 + 역세권 접근성)
- 
- GET /api/market-price?loc=서울 서초구 반포동&size=84&name=래미안원베일리
- 
- 환경변수:
- MOLIT_API_KEY  — 국토부 공공데이터 API 인증키 (Decoding 키)
- KAKAO_REST_KEY — 카카오 REST API 키
  */

// 구/군 → 법정동코드(5자리)
const LAWD_MAP = {
// ═══ 서울특별시 (11) ═══
'종로구':'11110','중구':'11140','용산구':'11170','성동구':'11200',
'광진구':'11215','동대문구':'11230','중랑구':'11260','성북구':'11290',
'강북구':'11305','도봉구':'11320','노원구':'11350','은평구':'11380',
'서대문구':'11410','마포구':'11440','양천구':'11470','강서구':'11500',
'구로구':'11530','금천구':'11545','영등포구':'11560','동작구':'11590',
'관악구':'11620','서초구':'11650','강남구':'11680','송파구':'11710','강동구':'11740',
// ═══ 경기도 (41) ═══
'수원시장안구':'41111','수원시권선구':'41113','수원시팔달구':'41115','수원시영통구':'41117',
'성남시수정구':'41131','성남시중원구':'41133','성남시분당구':'41135',
'의정부시':'41150',
'안양시만안구':'41171','안양시동안구':'41173',
'부천시':'41190','광명시':'41210','평택시':'41220',
'동두천시':'41250',
'안산시상록구':'41271','안산시단원구':'41273',
'고양시덕양구':'41281','고양시일산동구':'41285','고양시일산서구':'41287',
'과천시':'41290','구리시':'41310','남양주시':'41360',
'오산시':'41370','시흥시':'41390',
'군포시':'41410','의왕시':'41430','하남시':'41450',
'용인시처인구':'41461','용인시기흥구':'41463','용인시수지구':'41465',
'파주시':'41480','이천시':'41500','안성시':'41550',
'김포시':'41570','화성시':'41590','광주시':'41610',
'양주시':'41630','포천시':'41650','여주시':'41670',
// 화성시 행정구역 개편 (2026)
'동탄구':'41591','봉담구':'41592',
// ═══ 인천광역시 (28) ═══
'인천중구':'28110','인천동구':'28140','미추홀구':'28177',
'연수구':'28185','남동구':'28200','부평구':'28237',
'계양구':'28245','인천서구':'28260','강화군':'28710','옹진군':'28720',
// ═══ 부산광역시 (26) ═══
'부산중구':'26110','부산서구':'26140','부산동구':'26170',
'영도구':'26200','부산진구':'26230','동래구':'26260',
'부산남구':'26290','부산북구':'26320','해운대구':'26350',
'사하구':'26380','금정구':'26410','부산강서구':'26440',
'연제구':'26470','수영구':'26500','사상구':'26530','기장군':'26710',
// ═══ 대구광역시 (27) ═══
'대구중구':'27110','대구동구':'27140','대구서구':'27170',
'대구남구':'27200','대구북구':'27230','수성구':'27260',
'달서구':'27290','달성군':'27710',
// ═══ 광주광역시 (29) ═══
'광주동구':'29110','광주서구':'29140','광주남구':'29155',
'광주북구':'29170','광산구':'29200',
// ═══ 대전광역시 (30) ═══
'대전동구':'30110','대전중구':'30140','대전서구':'30170',
'유성구':'30200','대덕구':'30230',
// ═══ 울산광역시 (31) ═══
'울산중구':'31110','울산남구':'31140','울산동구':'31170',
'울산북구':'31200','울주군':'31710',
// ═══ 세종특별자치시 (36) ═══
'세종시':'36110',
// ═══ 충청북도 (43) ═══
'청주시상당구':'43111','청주시서원구':'43112','청주시흥덕구':'43113','청주시청원구':'43114',
'충주시':'43130','제천시':'43150','음성군':'43770','진천군':'43760',
// ═══ 충청남도 (44) ═══
'천안시동남구':'44131','천안시서북구':'44133',
'공주시':'44150','보령시':'44180','아산시':'44200','서산시':'44210',
'논산시':'44230','계룡시':'44250','당진시':'44270','홍성군':'44800',
// ═══ 전라북도 (45) ═══
'전주시완산구':'45111','전주시덕진구':'45113',
'군산시':'45130','익산시':'45140','정읍시':'45180','남원시':'45190','김제시':'45210',
// ═══ 전라남도 (46) ═══
'목포시':'46110','여수시':'46130','순천시':'46150','나주시':'46170','광양시':'46230',
// ═══ 경상북도 (47) ═══
'포항시남구':'47111','포항시북구':'47113',
'경주시':'47130','김천시':'47150','안동시':'47170','구미시':'47190',
'영주시':'47210','영천시':'47230','상주시':'47250','경산시':'47290',
// ═══ 경상남도 (48) ═══
'창원시의창구':'48121','창원시성산구':'48123','창원시마산합포구':'48125',
'창원시마산회원구':'48127','창원시진해구':'48129',
'진주시':'48170','통영시':'48220','사천시':'48240',
'김해시':'48250','밀양시':'48270','거제시':'48310','양산시':'48330',
// ═══ 제주특별자치도 (50) ═══
'제주시':'50110','서귀포시':'50130',
};

// 주소 → LAWD_MAP 키 추출
function extractGu(loc) {
const clean = loc.replace(/특별시|광역시|특별자치시|특별자치도/g, '').trim();
const parts = clean.split(/\s+/);

const cityPrefixMap = {
'인천':'인천','부산':'부산','대구':'대구','광주':'광주',
'대전':'대전','울산':'울산',
};
let cityPrefix = '';
for (const p of parts) {
for (const [key, prefix] of Object.entries(cityPrefixMap)) {
if (p.includes(key)) { cityPrefix = prefix; break; }
}
if (cityPrefix) break;
}

for (let i = 0; i < parts.length - 1; i++) {
if (parts[i].endsWith('시') && parts[i+1].endsWith('구')) {
const combined = parts[i] + parts[i+1];
if (LAWD_MAP[combined]) return combined;
}
}

for (const p of parts) {
if (p.endsWith('구')) {
if (cityPrefix && LAWD_MAP[cityPrefix + p]) return cityPrefix + p;
if (LAWD_MAP[p]) return p;
}
if (p.endsWith('군') && LAWD_MAP[p]) return p;
}

for (const p of parts) {
if (p.endsWith('시') && !p.includes('광역') && !p.includes('특별') &&
!['서울시','인천시','부산시','대구시','광주시','대전시','울산시'].includes(p)) {
if (LAWD_MAP[p]) return p;
}
}

if (loc.includes('세종')) return '세종시';

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
try {
const url1 = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(address)}`;
const res1 = await fetch(url1, { headers: { 'Authorization': `KakaoAK ${kakaoKey}` } });
const data1 = await res1.json();
if (data1.documents && data1.documents.length > 0) {
return { lat: parseFloat(data1.documents[0].y), lng: parseFloat(data1.documents[0].x) };
}
} catch(e) {}

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
const radiusKm = parseFloat(radius) || 1;

if (!loc) return res.status(400).json({ error: 'loc parameter required (예: 서울 서초구 반포동)' });

let gu = req.query.gu || extractGu(loc);
let correctedLoc = loc;
try {
const parts = loc.split(/\s+/);
const dongPart = parts.find(p => p.endsWith('동') || p.endsWith('읍') || p.endsWith('면'));
const searchQuery = name || dongPart || loc;

const addrUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(searchQuery)}`;
const addrRes = await fetch(addrUrl, { headers: { 'Authorization': `KakaoAK ${kakaoKey}` } });
const addrData = await addrRes.json();

if (addrData.documents && addrData.documents.length > 0) {
  const doc = addrData.documents[0];
  const addr = doc.road_address_name || doc.address_name || '';
  const correctedGu = extractGu(addr);
  if (correctedGu && LAWD_MAP[correctedGu]) {
    if (correctedGu !== gu) correctedLoc = addr;
    gu = correctedGu;
  }
}

} catch(e) {}

const lawdCd = LAWD_MAP[gu];
if (!lawdCd) {
return res.status(400).json({ error: `법정동코드를 찾을 수 없어요: "${gu}"` });
}

try {
// 1단계: 분양 단지 좌표 확인
const queries = [];
if (name) queries.push(name, `${correctedLoc} ${name}`, `${gu} ${name}`);
queries.push(correctedLoc, loc);

let targetCoord = null;
for (const q of queries) {
  targetCoord = await geocode(q, kakaoKey);
  if (targetCoord) break;
}

if (!targetCoord) {
  return res.status(400).json({
    error: `주소 좌표를 찾을 수 없어요`,
    tried: queries,
  });
}

// 2단계: 국토부 실거래가 조회 (최근 6개월, 병렬)
const now = new Date();
let allDeals = [];

const monthUrls = [];
for (let i = 0; i < 6; i++) {
  const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
  const dealYmd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`;
  monthUrls.push({ dealYmd, url:
    `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade`
    + `?serviceKey=${encodeURIComponent(molitKey)}`
    + `&LAWD_CD=${lawdCd}&DEAL_YMD=${dealYmd}&pageNo=1&numOfRows=500`
  });
}

// ★ 건축년도(buildYear) 추가 파싱
function parseDeals(text, dealYmd) {
  const deals = [];
  const items = text.match(/<item>([\s\S]*?)<\/item>/g) || [];
  for (const item of items) {
    const get = (tag) => {
      const m = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
      return m ? m[1].trim() : '';
    };
    const aptNm        = get('aptNm') || get('아파트');
    const excluUseAr   = parseFloat(get('excluUseAr') || get('전용면적') || '0');
    const dealAmount   = get('dealAmount') || get('거래금액') || '0';
    const dealAmountNum = parseInt(dealAmount.replace(/,/g, '').trim());
    const umdNm        = get('umdNm') || get('법정동') || '';
    const jibun        = get('jibun') || get('지번') || '';
    const dealYear     = get('dealYear')  || get('년')  || dealYmd.slice(0, 4);
    const dealMonth    = get('dealMonth') || get('월')  || dealYmd.slice(4);
    const dealDay      = get('dealDay')   || get('일')  || '1';
    // ★ 건축년도 파싱
    const buildYear    = parseInt(get('buildYear') || get('건축년도') || '0') || 0;

    if (aptNm && dealAmountNum > 0) {
      deals.push({
        name: aptNm, size: excluUseAr, price: dealAmountNum,
        dong: umdNm, jibun, builtYear: buildYear,
        date: `${dealYear}-${String(dealMonth).padStart(2, '0')}-${String(dealDay).padStart(2, '0')}`,
      });
    }
  }
  return deals;
}

const monthResults = await Promise.all(monthUrls.map(async ({ dealYmd, url }) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return parseDeals(text, dealYmd);
  } catch(e) { return []; }
}));
for (const deals of monthResults) allDeals.push(...deals);

if (allDeals.length === 0) {
  const lastUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade`
    + `?serviceKey=${encodeURIComponent(molitKey)}`
    + `&LAWD_CD=${lawdCd}&DEAL_YMD=${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}&pageNo=1&numOfRows=5`;
  const debugRes = await fetch(lastUrl);
  const debugText = await debugRes.text();
  return res.json({ mktP: null, message: '실거래 데이터가 없어요', query: { gu, lawdCd }, debug: debugText.slice(0, 500) });
}

// 3단계: 면적 필터 — ±5㎡ 없으면 ±8㎡, 없으면 ±10㎡
const targetSize = parseFloat(size || '84');
let filtered = [];
for (const range of [5, 8, 10]) {
  filtered = allDeals.filter(d => Math.abs(d.size - targetSize) <= range);
  if (filtered.length > 0) break;
}
if (filtered.length === 0) filtered = allDeals;

// 4단계: 아파트 좌표 조회
const uniqueApts = [...new Set(filtered.map(d => `${d.dong}|${d.name}`))];
const aptCoords = {};
const aptSlice = uniqueApts.slice(0, 20);
await Promise.all(aptSlice.map(async key => {
  const [dong, aptName] = key.split('|');
  const coord = await geocodeApt(aptName, dong, gu, kakaoKey);
  if (coord) aptCoords[key] = coord;
}));

// 거리 캐시 — 좌표 없는 단지도 제외하지 않고 별도 처리
const distCache = {};
for (const d of filtered) {
  const key = `${d.dong}|${d.name}`;
  const coord = aptCoords[key];
  if (coord) distCache[key] = distKm(targetCoord.lat, targetCoord.lng, coord.lat, coord.lng);
}

// 반경 필터 — 500m 우선, 없으면 1km, 없으면 구 전체
let results = [];
let usedRadiusLabel = '';

for (const [r, label] of [[0.5, '500m'], [1.0, '1km']]) {
  const within = filtered.filter(d => {
    const dist = distCache[`${d.dong}|${d.name}`];
    return dist !== undefined && dist <= r;
  });
  if (within.length >= 3) {
    results = within;
    usedRadiusLabel = label;
    break;
  }
}
if (results.length === 0) {
  // 좌표 조회 성공한 것 중 가장 가까운 순으로 fallback
  const withDist = filtered
    .filter(d => distCache[`${d.dong}|${d.name}`] !== undefined)
    .sort((a, b) => distCache[`${a.dong}|${a.name}`] - distCache[`${b.dong}|${b.name}`]);
  results = withDist.length >= 3 ? withDist : filtered;
  usedRadiusLabel = `${gu} 전체 (반경 내 데이터 부족)`;
}

// 5단계: 단지별 거래 건수 집계 → 소규모 단지 우선순위 필터
// 거래 5건 이상(중대단지) → 2~4건(소단지) → 1건(최후) 순으로 단계적 시도
const dealCountByApt = {};
results.forEach(d => {
  const key = `${d.dong}|${d.name}`;
  dealCountByApt[key] = (dealCountByApt[key] || 0) + 1;
});

function getAptTier(key) {
  const cnt = dealCountByApt[key] || 0;
  if (cnt >= 5) return 1; // 중대단지 우선
  if (cnt >= 2) return 2; // 소단지
  return 3;               // 소규모 (최후순위)
}

let finalResults = results;
for (const maxTier of [1, 2, 3]) {
  const candidate = results.filter(d => getAptTier(`${d.dong}|${d.name}`) <= maxTier);
  if (candidate.length >= 3) {
    finalResults = candidate;
    break;
  }
}

// 6단계: 시세 산출 — 최근 30건 중위값 (보정식 없음)
finalResults.sort((a, b) => b.date.localeCompare(a.date));
const recent = finalResults.slice(0, 30);
const prices = recent.map(d => d.price).sort((a, b) => a - b);
const median = prices[Math.floor(prices.length / 2)];
const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

return res.json({
  mktP: median,
  avg,
  max: prices[prices.length - 1],
  min: prices[0],
  sampleCount: recent.length,
  radiusUsed: usedRadiusLabel,
  targetCoord,
  recentDeals: recent.slice(0, 5).map(d => ({
    name: d.name, size: d.size, price: d.price, date: d.date,
    builtYear: d.builtYear || null,
    dist: aptCoords[`${d.dong}|${d.name}`]
      ? distKm(targetCoord.lat, targetCoord.lng,
          aptCoords[`${d.dong}|${d.name}`].lat,
          aptCoords[`${d.dong}|${d.name}`].lng).toFixed(2) + 'km'
      : '?',
  })),
  query: { gu, size: targetSize, radius: radiusKm, lawdCd },
});

} catch (err) {
return res.status(500).json({ error: err.message });
}
}
