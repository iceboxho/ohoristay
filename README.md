# Ohori Stay

Ohori Stay 是一個以福岡民宿／公寓式住宿為主題的訂房網站第一版。介面採日系簡約風格，以米白、淺木與奶茶色打造溫暖、乾淨的住宿品牌形象。

## 技術架構

- Next.js App Router（透過 vinext／Vite 執行）
- React 19
- TypeScript
- Tailwind CSS 4
- 響應式版型（桌面、平板、手機）

## 頁面

- `/` 首頁
- `/about` 關於我們
- `/rooms` 房型介紹
- `/facilities` 環境設施
- `/access` 交通資訊
- `/guide` 訂房須知
- `/booking` 線上訂房
- `/contact` 聯絡我們

## 本機開發

需求：Node.js `>=22.13.0`

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

正式建置與檢查：

```bash
npm run lint
npm run build
npm test
```

## 環境變數

複製 `.env.example` 為 `.env.local`，並依環境更新公開網址。第一版不需要 Supabase 金鑰。

## 訂房資料流程

目前訂房表單為前台示範流程：送出後只顯示成功訊息，不會儲存資料，也不會進行付款。

表單欄位與送出介面分別放在：

- `components/BookingForm.tsx`：表單 UI 與前端狀態
- `lib/booking.ts`：`BookingRequest` 型別與送出 adapter

未來串接 Supabase 時，可將 `submitBookingRequest()` 改為呼叫 Next.js Server Action 或 Route Handler，再由伺服器寫入 Supabase。請勿在前端暴露 service role key。

## 資料夾結構

```text
app/                 App Router 頁面與全域樣式
components/          共用導覽、頁尾、房型卡與表單元件
lib/                 網站資料、型別與資料存取介面
public/              公開靜態資源
worker/              vinext Cloudflare Worker 入口
build/               Sites/Vite 建置整合
```

## 第一版範圍

本版本未包含 Supabase、線上付款、真實後台、即時房況或正式價格。上線前請替換正式地址、聯絡信箱、房價、房型照片與完整取消政策。
