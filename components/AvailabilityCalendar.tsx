"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchUnavailableDateRanges, type UnavailableDateRange } from "@/lib/availability";

const weekDays = ["一", "二", "三", "四", "五", "六", "日"];

function dateOnly(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function firstGridDate(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  first.setDate(first.getDate() - mondayOffset);
  return first;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isUnavailable(date: string, ranges: UnavailableDateRange[]) {
  return ranges.some((range) => date >= range.checkInDate && date < range.checkOutDate);
}

export function AvailabilityCalendar({ compact = false }: { compact?: boolean }) {
  const now = useMemo(() => new Date(), []);
  const currentMonth = useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [now]);
  const today = useMemo(() => dateOnly(now), [now]);
  const [month, setMonth] = useState(currentMonth);
  const [ranges, setRanges] = useState<UnavailableDateRange[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const gridStart = useMemo(() => firstGridDate(month), [month]);
  const days = useMemo(() => Array.from({ length: 42 }, (_, index) => addDays(gridStart, index)), [gridStart]);
  const rangeStart = dateOnly(gridStart);
  const rangeEnd = dateOnly(addDays(gridStart, 42));

  useEffect(() => {
    let active = true;
    fetchUnavailableDateRanges(rangeStart, rangeEnd)
      .then((data) => {
        if (!active) return;
        setRanges(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setRanges([]);
        setStatus("error");
      });
    return () => { active = false; };
  }, [rangeEnd, rangeStart]);

  function goToBooking(date: string) {
    window.location.assign(`/booking?checkIn=${date}&guests=2`);
  }

  function changeMonth(offset: number) {
    setStatus("loading");
    setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
  }

  const previousDisabled = month.getTime() <= currentMonth.getTime();
  const monthLabel = new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "long" }).format(month);

  return (
    <div className={`availability-calendar${compact ? " availability-calendar-compact" : ""}`}>
      <div className="calendar-toolbar">
        <div><p className="eyebrow">LIVE AVAILABILITY</p><h3>{monthLabel}</h3></div>
        <div className="calendar-controls">
          <button type="button" aria-label="上個月" disabled={previousDisabled} onClick={() => changeMonth(-1)}>←</button>
          <button type="button" aria-label="下個月" onClick={() => changeMonth(1)}>→</button>
        </div>
      </div>

      <div className="calendar-weekdays" aria-hidden="true">{weekDays.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid" aria-label={`${monthLabel}入住月曆`}>
        {days.map((day) => {
          const iso = dateOnly(day);
          const outside = day.getMonth() !== month.getMonth();
          const past = iso < today;
          const booked = !past && isUnavailable(iso, ranges);
          const available = !outside && !past && !booked && status === "ready";
          const label = booked ? "已訂房" : past ? "過去日期" : available ? "可入住" : "日期";
          return (
            <button
              className={["calendar-day", outside ? "calendar-day-outside" : "", past ? "calendar-day-past" : "", booked ? "calendar-day-booked" : "", available ? "calendar-day-available" : ""].filter(Boolean).join(" ")}
              disabled={!available}
              key={iso}
              onClick={() => goToBooking(iso)}
              type="button"
              aria-label={`${iso}，${label}`}
            >
              <span>{day.getDate()}</span>
              {!outside && <small>{booked ? "已訂" : available ? "可住" : ""}</small>}
            </button>
          );
        })}
      </div>

      <div className="calendar-footer">
        <div className="calendar-legend"><span><i className="legend-available" />可入住</span><span><i className="legend-booked" />已訂房</span><span><i className="legend-past" />過去日期</span></div>
        {status === "loading" && <p role="status">正在更新最新房況…</p>}
        {status === "error" && <p role="alert">目前無法載入即時房況，請稍後再試或直接聯絡我們。</p>}
        {status === "ready" && <p>點選可入住日期，可直接帶入訂房申請。</p>}
      </div>
    </div>
  );
}
