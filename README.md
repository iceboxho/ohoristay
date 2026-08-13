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

複製 `.env.example` 為 `.env.local`，並設定：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Supabase Project URL 與 Anon Key 可從 Supabase Dashboard 的 **Connect** 或 **Project Settings → API** 取得。`NEXT_PUBLIC_SUPABASE_ANON_KEY` 是供瀏覽器搭配 RLS 使用的公開金鑰；請勿將 `service_role` key 放入前端環境變數、程式碼或 GitHub。

## 訂房資料流程

目前訂房表單會從 Supabase `rooms` 讀取啟用房型，並將送出的申請新增到 `bookings`。表單不會進行付款，也不包含登入或後台管理功能。

表單欄位與送出介面分別放在：

- `components/BookingForm.tsx`：表單 UI 與前端狀態
- `lib/booking.ts`：`BookingRequest` 型別與 Supabase 寫入
- `lib/rooms.ts`：讀取啟用中的 Supabase 房型
- `lib/supabase/client.ts`：瀏覽器端 Supabase client

訂房成功後可在 Supabase Dashboard 的 **Table Editor → bookings** 查看資料。前台使用 Anon Key，實際可執行的操作仍由 `supabase/schema.sql` 內的 RLS 與資料表權限限制。

## Supabase 資料庫 Schema

資料庫結構位於 `supabase/schema.sql`，包含：

- `rooms` 房型資料與 Ohori Stay 範例房型
- `bookings` 訂房申請
- `news` 最新消息
- `site_settings` 網站設定
- `updated_at` 自動更新 trigger
- Row Level Security 與前台最小存取權限

執行方式：

1. 登入 Supabase Dashboard 並開啟目標 Project。
2. 前往 **SQL Editor**，建立一個新的 Query。
3. 複製 `supabase/schema.sql` 的完整內容並貼入 SQL Editor。
4. 按下 **Run**，完成後到 **Table Editor** 確認四張資料表與範例房型。

RLS 規則允許公開前台讀取啟用中的房型與已發布消息，也允許新增狀態為 `pending` 的訂房申請；公開前台不能讀取訂房清單，也不能存取網站設定。管理操作請使用 Supabase Dashboard 或安全的伺服器端程式。

執行 SQL 並設定兩個 Supabase 環境變數後，前端訂房表單才可載入房型及儲存訂房申請。

## 資料夾結構

```text
app/                 App Router 頁面與全域樣式
components/          共用導覽、頁尾、房型卡與表單元件
lib/                 網站資料、型別與資料存取介面
public/              公開靜態資源
supabase/            Supabase SQL schema
worker/              vinext Cloudflare Worker 入口
build/               Sites/Vite 建置整合
```

## 第一版範圍

本版本已提供 Supabase SQL schema 與前台訂房寫入，但尚未包含線上付款、真實後台、登入、即時房況或正式價格。上線前請替換正式地址、聯絡信箱、房價、房型照片與完整取消政策。
