/**
 * api/config.js
 * 클라이언트(index.html)에 필요한 공개 설정값 반환
 * 민감한 키를 index.html에 하드코딩하지 않기 위함
 */
module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 1시간 캐시

  return res.status(200).json({
    kakaoClientId: process.env.KAKAO_CLIENT_ID,
    naverClientId: process.env.NAVER_CLIENT_ID,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnon: process.env.SUPABASE_ANON_KEY,
  });
};
