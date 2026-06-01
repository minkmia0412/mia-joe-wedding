# RSVP → Google Sheet 자동 정리 설정

RSVP 제출 내용이 본인 Google Drive의 시트에 한 줄씩 자동으로 쌓이게 하는 방법이에요.
서버나 외부 서비스 없이 **Google Apps Script**만으로 무료로 동작합니다. 약 5분.

---

## 1. 새 Google Sheet 만들기
1. [sheets.new](https://sheets.new) 로 새 시트를 만들어요.
2. 1행(헤더)에 아래를 그대로 입력 (A1부터 순서대로):

```
timestamp | name | email | attending | guests | meal | dietary | song | note
```

3. 시트 이름은 아무거나 (예: "Wedding RSVPs").

## 2. Apps Script 붙여넣기
1. 시트 상단 메뉴 **Extensions → Apps Script** 클릭.
2. 열린 편집기의 코드를 모두 지우고 아래를 붙여넣어요:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = e.parameter;
  sheet.appendRow([
    p.timestamp || new Date().toISOString(),
    p.name || "",
    p.email || "",
    p.attending || "",
    p.guests || "",
    p.meal || "",
    p.dietary || "",
    p.song || "",
    p.note || ""
  ]);
  return ContentService.createTextOutput("ok");
}
```

3. 디스크 아이콘으로 저장.

## 3. 웹 앱으로 배포
1. 오른쪽 위 **Deploy → New deployment**.
2. 톱니바퀴(Select type) → **Web app**.
3. 설정:
   - **Description**: 아무거나
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`  ← 중요! (로그인 없이 손님이 제출 가능해야 하므로)
4. **Deploy** → Google 계정 권한 승인 (처음 한 번, "advanced → go to project" 거쳐 허용).
5. 표시되는 **Web app URL** 복사 (`https://script.google.com/macros/s/.../exec` 형태).

## 4. 사이트에 URL 연결
1. `wedding-sections.jsx` 파일에서 아래 줄을 찾아요:

```javascript
const SHEET_ENDPOINT = "";
```

2. 따옴표 안에 복사한 URL을 붙여넣어요:

```javascript
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfyc.../exec";
```

또는 저(클로드)에게 "이 URL 넣어줘: ..." 라고 보내주시면 제가 넣어드릴게요.

---

## 확인
- 사이트에서 테스트로 RSVP 한 번 제출 → 시트에 새 줄이 생기면 성공!
- 안 보이면: 배포 설정의 **Who has access = Anyone** 인지 다시 확인하세요.

## 참고
- 코드를 수정하면 매번 **Deploy → Manage deployments → 편집(연필) → New version → Deploy** 해야 반영돼요.
- 손님 입력값은 시트에만 저장되고 사이트엔 안 보여요.
- URL이 비어 있으면(`""`) 폼은 정상 동작하지만 어디에도 저장되지 않아요 (현재 상태).
