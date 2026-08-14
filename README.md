# Ohori Stay

Ohori Stay 是福岡大濠一帶的整套 2LDK 訂房網站。住宿一次只接待一組旅客、最多 6 人；介面採日系簡約風格，以米白、淺木與奶茶色呈現溫暖乾淨的品牌形象。

## 技術架構

- Next.js App Router（透過 vinext／Vite 執行）
- React 19
- TypeScript
- Tailwind CSS 4
- 響應式版型（桌面、平板、手機）

## 頁面

- `/` 首頁
- `/about` 關於我們
- `/rooms` 整套 2LDK 空間介紹
- `/facilities` 環境設施
- `/access` 交通資訊
- `/guide` 訂房須知
- `/booking` 線上訂房
- `/contact` 聯絡我們
- `/admin/bookings` 訂房申請管理（需 Supabase Auth 管理員登入）

首頁與線上訂房頁都會顯示公開入住月曆；頁首保留「訂房管理」入口，管理員仍需登入才能查看訂單。

入住須知頁另提供 801 入住指南與退房指南圖卡，可點選放大查看；網站使用最佳化 WebP 圖片，原始指南檔案不會被修改。

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

訂房表單會從 Supabase `rooms` 讀取唯一啟用的 `Ohori Stay 2LDK` 住宿資料，並將送出的申請新增到 `bookings`。前後端都限制入住人數為 1–6 人。表單不會進行付款；第一版後台可讓授權管理員查看訂房申請並修改狀態。

公開房況月曆透過 `get_public_unavailable_dates` 讀取「已確認」訂單的入住與退房日期，僅回傳日期，不會公開姓名、電話、Email、備註或其他訂單資料。選擇日期送出前，表單會再透過 `is_booking_date_available` 確認沒有撞期。

表單欄位與送出介面分別放在：

- `components/BookingForm.tsx`：表單 UI 與前端狀態
- `lib/booking.ts`：`BookingRequest` 型別與 Supabase 寫入
- `lib/rooms.ts`：讀取啟用中的 Supabase 房型
- `components/AvailabilityCalendar.tsx`：公開房況月曆與月份切換
- `lib/availability.ts`：公開房況與送出前撞期檢查
- `lib/supabase/client.ts`：瀏覽器端 Supabase client
- `components/AdminBookings.tsx`：管理員登入、訂單列表與狀態操作
- `lib/admin-bookings.ts`：後台訂單讀取與狀態更新

訂房成功後可在 Supabase Dashboard 的 **Table Editor → bookings** 查看資料。前台使用 Anon Key，實際可執行的操作仍由 `supabase/schema.sql` 內的 RLS 與資料表權限限制。

## Supabase 資料庫 Schema

資料庫結構位於 `supabase/schema.sql`，包含：

- `rooms` 住宿資料（目前只啟用一筆 `Ohori Stay 2LDK`）
- `bookings` 訂房申請
- `news` 最新消息
- `site_settings` 網站設定
- `admin_users` Supabase Auth 管理員允許清單
- `updated_at` 自動更新 trigger
- Row Level Security 與前台最小存取權限
- 只回傳已確認日期的公開房況 functions
- 防止同一住宿出現重疊已確認訂單的 exclusion constraint

執行方式：

1. 登入 Supabase Dashboard 並開啟目標 Project。
2. 前往 **SQL Editor**，建立一個新的 Query。
3. 複製 `supabase/schema.sql` 的完整內容並貼入 SQL Editor。
4. 按下 **Run**，完成後到 **Table Editor → rooms** 確認只有 `Ohori Stay 2LDK` 為啟用狀態。

若專案先前執行過舊版 schema，重新執行本檔會保留既有訂房紀錄、停用三筆舊示範房型，並加入每筆訂房最多 6 人、公開房況月曆與已確認訂單不可撞期的限制。

RLS 規則允許公開前台讀取啟用中的房型與已發布消息，也允許新增狀態為 `pending` 的訂房申請；公開前台不能讀取或修改訂房清單，只能呼叫限制過的房況 functions 取得已確認日期。只有通過 Supabase Auth 登入且列在 `admin_users` 的帳號可以讀取訂單及修改 `status`。

執行 SQL 並設定兩個 Supabase 環境變數後，前端訂房表單才可載入房型及儲存訂房申請。

## 第一版後台設定

1. 先在 Supabase **SQL Editor** 重新執行最新版 `supabase/schema.sql`，建立 `admin_users` 與管理員 RLS policies。
2. 前往 **Authentication → Users**，使用 **Add user** 建立管理員 Email／密碼帳號。網站不提供公開註冊功能。
3. 複製該使用者的 UUID，在 SQL Editor 執行：

```sql
insert into public.admin_users (user_id)
values ('請替換為管理員的 Auth User UUID')
on conflict (user_id) do nothing;
```

4. 開啟 `/admin/bookings`，使用剛建立的 Email 與密碼登入。

後台仍只使用 `NEXT_PUBLIC_SUPABASE_URL` 與 publishable／anon key，並透過 Supabase Auth session 與 RLS 控制權限；請勿加入 `service_role` key。

> 這是第一版測試用後台。正式上線前仍必須完善管理員登入與權限保護，例如 MFA、密碼與帳號生命週期政策、登入稽核、異常操作監控及權限定期檢查。

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

本版本已提供 Supabase SQL schema、公開房況月曆、前台訂房寫入，以及第一版訂單查看與狀態管理；尚未包含線上付款、住宿內容管理、最新消息管理或完整正式後台。上線前請完成上述管理員安全強化，並確認正式地址、聯絡信箱、房價、實景照片與完整取消政策。
