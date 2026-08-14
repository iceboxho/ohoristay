"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { submitBookingRequest } from "@/lib/booking";
import { checkBookingAvailability } from "@/lib/availability";
import { fetchActiveRooms, type RoomOption } from "@/lib/rooms";
import { SupabaseConfigurationError } from "@/lib/supabase/client";

type FormStatus = "idle" | "submitting" | "success";
type RoomsStatus = "loading" | "ready" | "error";
type BookingFormProps = { initialRoom?: string; initialCheckIn?: string; initialCheckOut?: string; initialGuests?: string };

function localToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function serviceErrorMessage(error: unknown) {
  if (error instanceof SupabaseConfigurationError) return "訂房服務尚未完成設定，請聯絡住宿方。";
  return "訂房申請送出失敗，請稍後再試，或透過聯絡我們頁面與我們聯繫。";
}

export function BookingForm({ initialRoom = "", initialCheckIn = "", initialCheckOut = "", initialGuests = "2" }: BookingFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [roomsStatus, setRoomsStatus] = useState<RoomsStatus>("loading");
  const [roomOption, setRoomOption] = useState<RoomOption | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => localToday(), []);
  const safeGuests = /^[1-6]$/.test(initialGuests) ? initialGuests : "2";

  useEffect(() => {
    let cancelled = false;
    async function loadStay() {
      setRoomsStatus("loading");
      setErrorMessage("");
      try {
        const rooms = await fetchActiveRooms();
        if (cancelled) return;
        const preferred = rooms.find((room) => room.slug === initialRoom || room.id === initialRoom);
        const singleStay = preferred ?? rooms.find((room) => room.slug === "ohori-stay-2ldk") ?? rooms[0] ?? null;
        setRoomOption(singleStay);
        setRoomsStatus("ready");
        if (!singleStay) setErrorMessage("目前沒有可申請的住宿空間，請稍後再試。");
      } catch (error) {
        if (cancelled) return;
        setRoomsStatus("error");
        setErrorMessage(error instanceof SupabaseConfigurationError ? "訂房服務尚未完成設定，請聯絡住宿方。" : "目前無法載入住宿資料，請稍後重新整理頁面再試。");
      }
    }
    void loadStay();
    return () => { cancelled = true; };
  }, [initialRoom]);

  useEffect(() => { if (status === "success") successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const roomId = String(form.get("roomType") ?? "").trim();
    const checkIn = String(form.get("checkIn") ?? "").trim();
    const checkOut = String(form.get("checkOut") ?? "").trim();
    const guests = Number(form.get("guests"));
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const lineId = String(form.get("lineId") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();

    if (!roomId) return setErrorMessage("目前無法辨識住宿空間，請重新整理頁面再試。");
    if (!checkIn) return setErrorMessage("請選擇入住日期。");
    if (!checkOut) return setErrorMessage("請選擇退房日期。");
    if (checkOut <= checkIn) return setErrorMessage("退房日期必須晚於入住日期。");
    if (!Number.isInteger(guests) || guests < 1 || guests > 6) return setErrorMessage("入住人數需為 1 至 6 人。");
    if (!name) return setErrorMessage("請填寫姓名。");
    if (!phone) return setErrorMessage("請填寫手機號碼。");

    setStatus("submitting");
    try {
      const available = await checkBookingAvailability(roomId, checkIn, checkOut);
      if (!available) {
        setStatus("idle");
        setErrorMessage("您選擇的日期已有已確認的住宿，請參考房況月曆改選其他日期。");
        return;
      }
      await submitBookingRequest({ roomId, checkIn, checkOut, guests, name, phone, email, lineId, notes });
      formElement.reset();
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setErrorMessage(serviceErrorMessage(error));
    }
  }

  if (status === "success") {
    return <div className="form-success" ref={successRef} role="status"><span>予約リクエスト</span><h2>謝謝您的申請</h2><p>已收到您的訂房申請，我們會盡快與您確認房況。</p><button className="button button-outline" type="button" onClick={() => setStatus("idle")}>再次填寫</button></div>;
  }

  return <form className="booking-form" onSubmit={handleSubmit} noValidate>
    {errorMessage && <div className="form-error" role="alert">{errorMessage}</div>}
    <div className="stay-selection" aria-live="polite"><span>本次申請住宿</span><strong>{roomsStatus === "loading" ? "正在載入住宿資料…" : roomOption?.name ?? "Ohori Stay 2LDK"}</strong><small>整套 2LDK・一次一組・最多 6 人</small></div>
    <input name="roomType" type="hidden" value={roomOption?.id ?? ""} />

    <div className="form-section-heading"><span>01</span><div><h2>住宿需求</h2><p>請告訴我們預計入住的日期與人數。</p></div></div>
    <div className="form-grid">
      <label className="field">入住日期<input name="checkIn" type="date" min={today} defaultValue={initialCheckIn} required /></label>
      <label className="field">退房日期<input name="checkOut" type="date" min={today} defaultValue={initialCheckOut} required /></label>
      <label className="field field-wide">入住人數 <small>最多 6 人</small><input name="guests" type="number" min="1" max="6" step="1" defaultValue={safeGuests} required /></label>
    </div>

    <div className="form-section-heading"><span>02</span><div><h2>聯絡資料</h2><p>我們會透過 Email 或手機與您確認房況。</p></div></div>
    <div className="form-grid">
      <label className="field">姓名<input name="name" type="text" autoComplete="name" placeholder="王小明" required /></label>
      <label className="field">手機<input name="phone" type="tel" autoComplete="tel" placeholder="0912 345 678" required /></label>
      <label className="field">Email <small>選填</small><input name="email" type="email" autoComplete="email" placeholder="hello@example.com" /></label>
      <label className="field">LINE ID <small>選填</small><input name="lineId" type="text" placeholder="您的 LINE ID" /></label>
      <label className="field field-wide">備註 <small>選填</small><textarea name="notes" rows={5} placeholder="如有兒童、長輩、特殊需求或預計抵達時間，歡迎告訴我們。" /></label>
    </div>
    <div className="form-submit"><p>送出表單不代表完成訂房；待我們確認房況與費用後，才會正式成立。</p><button className="button" disabled={status === "submitting" || roomsStatus !== "ready" || !roomOption} type="submit">{status === "submitting" ? "正在送出…" : "送出訂房申請"}</button></div>
  </form>;
}
