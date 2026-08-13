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
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the booking page and required fields", async () => {
  const response = await render("/booking");
  assert.equal(response.status, 200);

  const html = await response.text();
  for (const field of ["roomType", "checkIn", "checkOut", "guests", "name", "phone", "email", "lineId", "notes"]) {
    assert.match(html, new RegExp(`name=["']${field}["']`));
  }
  assert.match(html, /正在載入房型/);
  assert.match(html, /送出訂房申請/);
});

test("booking integration targets the RLS-protected Supabase tables", async () => {
  const [bookingSource, roomsSource, envExample] = await Promise.all([
    readFile(new URL("../lib/booking.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/rooms.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
  ]);

  assert.match(roomsSource, /from\("rooms"\)/);
  assert.match(roomsSource, /eq\("is_active", true\)/);
  assert.match(bookingSource, /from\("bookings"\)\.insert/);
  for (const field of ["room_id", "check_in_date", "check_out_date", "guests", "customer_name", "customer_phone", "customer_email", "line_id", "note"]) {
    assert.match(bookingSource, new RegExp(`${field}:`));
  }
  assert.doesNotMatch(bookingSource, /status:/);
  assert.match(envExample, /^NEXT_PUBLIC_SUPABASE_URL=$/m);
  assert.match(envExample, /^NEXT_PUBLIC_SUPABASE_ANON_KEY=$/m);
});
