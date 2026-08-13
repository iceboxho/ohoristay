"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { submitBookingRequest } from "@/lib/booking";
import { rooms } from "@/lib/site-data";

export function BookingForm({ initialRoom = "" }: { initialRoom?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    await submitBookingRequest({
      roomType: String(form.get("roomType")),
      checkIn: String(form.get("checkIn")),
      checkOut: String(form.get("checkOut")),
      guests: Number(form.get("guests")),
      name: String(form.get("name")),
      phone: String(form.get("phone")),
      email: String(form.get("email")),
      lineId: String(form.get("lineId") ?? ""),
      notes: String(form.get("notes") ?? ""),
    });
    formElement.reset();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="form-success" ref={successRef} role="status">
        <span>予約リクエスト</span>
        <h2>謝謝您的申請</h2>
        <p>已收到您的訂房申請，我們會盡快與您確認房況。</p>
        <button className="button button-outline" type="button" onClick={() => setStatus("idle")}>再次填寫</button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-section-heading"><span>01</span><div><h2>住宿需求</h2><p>請先告訴我們預計入住的日期與人數。</p></div></div>
      <div className="form-grid">
        <label className="field field-wide">房型
          <select name="roomType" defaultValue={initialRoom} required>
            <option value="" disabled>請選擇房型</option>
            {rooms.map((room) => <option value={room.id} key={room.id}>{room.name}・{room.guests}</option>)}
          </select>
        </label>
        <label className="field">入住日期<input name="checkIn" type="date" min={today} required /></label>
        <label className="field">退房日期<input name="checkOut" type="date" min={today} required /></label>
        <label className="field field-wide">入住人數
          <select name="guests" defaultValue="2" required>
            {[1, 2, 3, 4].map((count) => <option value={count} key={count}>{count} 人</option>)}
          </select>
        </label>
      </div>

      <div className="form-section-heading"><span>02</span><div><h2>聯絡資料</h2><p>我們會透過 Email 或手機與您確認房況。</p></div></div>
      <div className="form-grid">
        <label className="field">姓名<input name="name" type="text" autoComplete="name" placeholder="王小明" required /></label>
        <label className="field">手機<input name="phone" type="tel" autoComplete="tel" placeholder="0912 345 678" required /></label>
        <label className="field">Email<input name="email" type="email" autoComplete="email" placeholder="hello@example.com" required /></label>
        <label className="field">LINE ID <small>選填</small><input name="lineId" type="text" placeholder="您的 LINE ID" /></label>
        <label className="field field-wide">備註 <small>選填</small><textarea name="notes" rows={5} placeholder="如有兒童、特殊需求或預計抵達時間，歡迎告訴我們。" /></label>
      </div>

      <div className="form-submit">
        <p>送出表單不代表完成訂房；待我們確認房況與費用後，才會正式成立。</p>
        <button className="button" disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "正在送出…" : "送出訂房申請"}
        </button>
      </div>
    </form>
  );
}
