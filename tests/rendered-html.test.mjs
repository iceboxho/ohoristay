import assert from "node:assert/strict";
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
  assert.match(html, /送出訂房申請/);
});
