/**
 * 구글시트에 시세 자동 기록
 *
 * 사용법: POST /api/update-sheet
 * Body: { name, price, minP, mktP, factors }
 *
 * 구글시트 연동: Google Apps Script Web App을 통해 기록
 * 환경변수: GOOGLE_SHEET_WEBHOOK (Apps Script 배포 URL)
 *
 * === Google Apps Script 코드 (시트에 직접 추가) ===
 *
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *
 *   // 중복 체크 (A열 = name)
 *   var names = sheet.getRange('A:A').getValues().flat();
 *   if (names.includes(data.name)) {
 *     // 기존 행 업데이트
 *     var row = names.indexOf(data.name) + 1;
 *     sheet.getRange(row, 1, 1, 5).setValues([[
 *       data.name, data.price, data.minP, data.mktP, data.factors
 *     ]]);
 *     return ContentService.createTextOutput(JSON.stringify({status:'updated', row}));
 *   }
 *
 *   // 새 행 추가
 *   sheet.appendRow([data.name, data.price, data.minP, data.mktP, data.factors]);
 *   return ContentService.createTextOutput(JSON.stringify({status:'added'}));
 * }
 *
 * ※ 위 코드를 구글시트 > 확장 프로그램 > Apps Script에 붙여넣고
 *   배포 > 웹 앱으로 배포 > 액세스: 모든 사용자
 *   배포 URL을 Vercel 환경변수 GOOGLE_SHEET_WEBHOOK에 설정
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) return res.status(500).json({ error: 'GOOGLE_SHEET_WEBHOOK not set' });

  const { name, price, minP, mktP, factors } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, minP, mktP, factors }),
    });
    const result = await response.text();
    return res.json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
