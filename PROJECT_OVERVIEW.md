# 專案總攬

## 專案名稱

Random Picker / 隨機抽選工具

## 專案目的

本專案是一個以 HTML、CSS、JavaScript 製作的輕量型隨機抽選工具。使用者可以在網頁中輸入多個候選項目，每個項目一行，按下抽選按鈕後由前端隨機選出其中一項。

專案另外包含 `LineBot` 範例程式，提供 LINE Bot 與 Google Apps Script 整合的參考實作，可用於文字指令抽選或表單式互動流程。

## 目前技術棧

- 前端：HTML、CSS、Vanilla JavaScript
- 狀態保存：Browser `localStorage`
- 字體：Google Fonts
- LINE Bot 範例：Google Apps Script、LINE Messaging API
- 部署方向：可直接部署到 GitHub Pages 或其他靜態網站服務

## 專案結構

```text
web-site-random/
├── index.html
├── style.css
├── script.js
├── README.md
├── PROJECT_OVERVIEW.md
└── LineBot/
    ├── RandomLineBot.js
    └── LineBotScriptExample.js
```

## 主要檔案說明

### `index.html`

網頁主入口，負責定義頁面結構。

包含：

- 頁面標題與描述
- Google Fonts 載入
- 主輸入區塊
- 抽選、清除、重新抽選按鈕
- 抽選結果顯示區
- `style.css` 與 `script.js` 載入

### `style.css`

負責整體視覺樣式與響應式排版。

包含：

- 深色漸層背景
- Glassmorphism 卡片樣式
- 按鈕互動狀態
- 結果卡片動畫
- 手機版排版調整

### `script.js`

前端主要互動邏輯。

核心功能：

- 讀取文字輸入框內容
- 依換行切分候選項目
- 過濾空白項目
- 隨機選出一個結果
- 顯示結果區塊
- 清除輸入資料
- 使用 `localStorage` 保存上次輸入內容

主要函式：

- `getRandomItem()`：從輸入內容中抽出隨機項目
- `showResult()`：控制抽選流程與結果顯示

### `README.md`

原始專案說明文件，內容應為專案介紹與 GitHub Pages 部署說明。

目前檔案中的中文內容在終端檢視時出現亂碼，後續若要正式維護，建議重新確認檔案編碼並重寫可讀版本。

### `LineBot/RandomLineBot.js`

LINE Bot 隨機抽選功能範例。

功能概要：

- 接收 LINE webhook 訊息
- 判斷訊息是否以 `/r` 或 `/random` 開頭
- 從指令後方的多行內容中抽出隨機項目
- 使用 LINE Messaging API 回覆抽選結果

使用前需設定：

- `CHANNEL_ACCESS_TOKEN`
- LINE Developers webhook
- Google Apps Script 部署 URL

### `LineBot/LineBotScriptExample.js`

較完整的 LINE Bot 互動流程範例。

功能概要：

- 接收 LINE 訊息與 postback
- 使用 Google Spreadsheet 儲存使用者回答
- 使用 date/time picker 收集日期與時間
- 使用 confirm template 讓使用者確認或取消
- 可推送提醒訊息

使用前需設定：

- `CHANNEL_ACCESS_TOKEN`
- `spreadSheetID`
- 必要的 Google Apps Script 權限
- LINE Messaging API webhook

## 網頁操作流程

1. 開啟 `index.html`
2. 在輸入框中輸入候選項目，每行一個
3. 點擊抽選按鈕
4. 系統從候選項目中隨機選出一項
5. 可重新抽選或清除所有輸入

## 本機執行方式

此專案是靜態網頁，不需要建置流程。

可直接用瀏覽器開啟：

```text
index.html
```

若要模擬靜態伺服器環境，也可以在專案根目錄啟動任一簡易 HTTP server，例如：

```bash
npx serve .
```

或：

```bash
python -m http.server 8000
```

## 部署方式

適合部署到：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 任意靜態檔案主機

GitHub Pages 基本流程：

1. 將 `index.html`、`style.css`、`script.js` 推送到 GitHub repository
2. 到 repository 的 Settings
3. 開啟 Pages
4. 選擇部署分支，例如 `main`
5. 儲存後等待 GitHub Pages 產生網址

## 已知狀況與注意事項

- 多個檔案中的中文文字目前在終端輸出時呈現亂碼，建議後續統一確認並保存為 UTF-8。
- `README.md` 內容可讀性受亂碼影響，建議以本檔作為新的維護起點。
- 前端功能目前沒有使用第三方框架，維護成本低，但也沒有測試工具或建置流程。
- LINE Bot 程式需要在 Google Apps Script 環境執行，不能直接在一般瀏覽器或 Node.js 中完整運作。
- LINE Bot 範例內的 token 與 spreadsheet ID 目前為空字串，正式使用前必須補上並避免提交真實密鑰。

## 後續可改進方向

- 修復或重寫亂碼中文文案
- 補上 `.gitignore`，排除 `.vs/` 等本機 IDE 產物
- 增加輸入範例與錯誤提示
- 增加抽選歷史紀錄
- 支援權重抽選
- 支援匯入 / 匯出候選清單
- 將 LINE Bot 設定值改由環境變數或 Apps Script Properties 管理
- 補充正式部署文件與截圖
