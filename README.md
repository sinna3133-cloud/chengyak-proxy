# 쉬운청약 CORS 프록시

공공데이터포털 API를 브라우저에서 직접 호출할 때 발생하는 CORS 오류를 해결하는 Vercel 서버리스 프록시예요.

## 사용법

배포 후 아래처럼 호출해요.

```
https://your-proxy.vercel.app/api/proxy?url=인코딩된_API_URL
```

## HTML 앱에서 연동하는 방법

```javascript
// 기존 (CORS 오류 발생)
const url = 'https://api.odcloud.kr/api/...';

// 변경 후 (프록시 경유)
const PROXY = 'https://your-proxy.vercel.app/api/proxy?url=';
const url = PROXY + encodeURIComponent('https://api.odcloud.kr/api/...');
```
