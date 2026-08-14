import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Ohori Stay homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /OHORI/);
  assert.match(html, /住進大濠/);
  assert.match(html, /線上訂房/);
  assert.match(html, /一次一組/);
  assert.match(html, /最多 6 人/);
  assert.match(html, /href=["']\/admin\/bookings["'][^>]*>訂房管理</);
  assert.match(html, /STAY CALENDAR/);
  assert.match(html, /正在更新最新房況/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the booking page and required fields", async () => {
  const response = await render("/booking");
  assert.equal(response.status, 200);

  const html = await response.text();
  for (const field of ["roomType", "checkIn", "checkOut", "guests", "name", "phone", "email", "lineId", "notes"]) {
    assert.match(html, new RegExp(`name=["']${field}["']`));
  }
  assert.match(html, /正在載入住宿資料/);
  assert.match(html, /max=["']6["']/);
  assert.match(html, /送出訂房申請/);
});

test("booking integration targets the RLS-protected Supabase tables", async () => {
  const [bookingSource, roomsSource, availabilitySource, envExample] = await Promise.all([
    readFile(new URL("../lib/booking.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/rooms.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/availability.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
  ]);

  assert.match(roomsSource, /from\("rooms"\)/);
  assert.match(roomsSource, /eq\("is_active", true\)/);
  assert.match(bookingSource, /from\("bookings"\)\.insert/);
  for (const field of ["room_id", "check_in_date", "check_out_date", "guests", "customer_name", "customer_phone", "customer_email", "line_id", "note"]) {
    assert.match(bookingSource, new RegExp(`${field}:`));
  }
  assert.doesNotMatch(bookingSource, /status:/);
  assert.match(availabilitySource, /rpc\("get_public_unavailable_dates"/);
  assert.match(availabilitySource, /rpc\("is_booking_date_available"/);
  assert.match(envExample, /^NEXT_PUBLIC_SUPABASE_URL=$/m);
  assert.match(envExample, /^NEXT_PUBLIC_SUPABASE_ANON_KEY=$/m);
});

test("server-renders the protected admin bookings page shell", async () => {
  const response = await render("/admin/bookings");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /訂房申請管理/);
  assert.match(html, /正在確認管理員登入狀態/);
  assert.match(html, /noindex/);
});

test("admin booking access uses Supabase Auth and admin-only RLS", async () => {
  const [componentSource, dataSource, schema, readme] = await Promise.all([
    readFile(new URL("../components/AdminBookings.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/admin-bookings.ts", import.meta.url), "utf8"),
    readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.match(componentSource, /signInWithPassword/);
  assert.doesNotMatch(componentSource, /signUp/);
  assert.match(dataSource, /from\("bookings"\)/);
  assert.match(dataSource, /rooms\(name\)/);
  assert.match(dataSource, /\.update\(\{ status \}\)/);
  for (const status of ["pending", "confirmed", "cancelled", "completed"]) {
    assert.match(dataSource, new RegExp(`value: "${status}"`));
  }
  assert.match(schema, /create table if not exists public\.admin_users/);
  assert.match(schema, /create or replace function public\.is_admin/);
  assert.match(schema, /create policy "Admins can view bookings"/);
  assert.match(schema, /create policy "Admins can update booking status"/);
  assert.match(schema, /grant update \(status\) on table public\.bookings to authenticated/);
  assert.match(schema, /bookings_guests_limit check \(guests between 1 and 6\)/);
  assert.match(schema, /bookings_no_confirmed_overlap/);
  assert.match(schema, /create or replace function public\.get_public_unavailable_dates/);
  assert.match(schema, /create or replace function public\.is_booking_date_available/);
  assert.match(schema, /never exposes guest data/);
  assert.match(schema, /'ohori-stay-2ldk'/);
  assert.match(readme, /第一版測試用後台/);
  assert.match(readme, /service_role/);
});
