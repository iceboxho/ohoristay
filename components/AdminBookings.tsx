"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  bookingStatusOptions,
  fetchAdminBookings,
  updateAdminBookingStatus,
  type AdminBooking,
  type BookingStatus,
} from "@/lib/admin-bookings";
import { getSupabaseBrowserClient, SupabaseConfigurationError } from "@/lib/supabase/client";

type AuthState = "checking" | "signed-out" | "signed-in";
type ListState = "idle" | "loading" | "ready" | "error";

const createdAtFormatter = new Intl.DateTimeFormat("zh-TW", {
  dateStyle: "medium",
  timeStyle: "short",
});

function displayValue(value: string | null) {
  return value?.trim() || "—";
}

function statusLabel(status: BookingStatus) {
  return bookingStatusOptions.find((option) => option.value === status)?.label ?? status;
}

function errorMessage(error: unknown) {
  if (error instanceof SupabaseConfigurationError) return "後台尚未完成環境設定。";
  if (error && typeof error === "object" && "code" in error && error.code === "42501") {
    return "此帳號沒有管理員權限，請確認已加入 admin_users。";
  }
  if (error && typeof error === "object" && "code" in error && error.code === "23P01") {
    return "這段日期已有其他已確認訂單，無法重複確認。請先檢查入住與退房日期。";
  }
  return "目前無法讀取或更新訂單，請稍後再試。";
}

export function AdminBookings() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [listState, setListState] = useState<ListState>("idle");
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [email, setEmail] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const loadBookings = useCallback(async () => {
    setListState("loading");
    setError("");
    try {
      setBookings(await fetchAdminBookings());
      setListState("ready");
    } catch (loadError) {
      setListState("error");
      setError(errorMessage(loadError));
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const session = data.session;
      setAccountEmail(session?.user.email ?? "");
      setAuthState(session ? "signed-in" : "signed-out");
      if (session) void loadBookings();
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setAccountEmail(session?.user.email ?? "");
      setAuthState(session ? "signed-in" : "signed-out");
      if (!session) {
        setBookings([]);
        setListState("idle");
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [loadBookings]);

  const statusCounts = useMemo(
    () =>
      bookingStatusOptions.map((option) => ({
        ...option,
        count: bookings.filter((booking) => booking.status === option.value).length,
      })),
    [bookings],
  );

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");

    if (!email.trim() || !password) {
      setError("請輸入管理員 Email 與密碼。");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError("登入失敗，請確認 Email、密碼與管理員帳號設定。");
      return;
    }

    await loadBookings();
  }

  async function handleLogout() {
    setError("");
    await getSupabaseBrowserClient().auth.signOut();
  }

  async function handleStatusChange(id: string, status: BookingStatus) {
    setUpdatingId(id);
    setError("");
    try {
      const updated = await updateAdminBookingStatus(id, status);
      setBookings((current) =>
        current.map((booking) =>
          booking.id === updated.id ? { ...booking, status: updated.status } : booking,
        ),
      );
    } catch (updateError) {
      setError(errorMessage(updateError));
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <section className="admin-shell">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">OHORI STAY ADMIN</p>
          <h1>訂房申請管理</h1>
          <p>查看最新訂房資料，並更新每筆申請的確認狀態。</p>
        </div>
        {authState === "signed-in" && (
          <div className="admin-account">
            <span>{accountEmail}</span>
            <button className="text-link" type="button" onClick={handleLogout}>登出</button>
          </div>
        )}
      </div>

      {error && <div className="admin-alert" role="alert">{error}</div>}

      {authState === "checking" && <div className="admin-state" role="status">正在確認管理員登入狀態…</div>}

      {authState === "signed-out" && (
        <form className="admin-login" onSubmit={handleLogin}>
          <p className="eyebrow">ADMIN SIGN IN</p>
          <h2>管理員登入</h2>
          <p>請使用已在 Supabase Auth 建立、並加入 admin_users 的管理員帳號。</p>
          <label className="field">
            Email
            <input
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="field">
            密碼
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="button" type="submit">登入後台</button>
        </form>
      )}

      {authState === "signed-in" && (
        <>
          <div className="admin-summary" aria-label="訂單狀態統計">
            {statusCounts.map((item) => (
              <div key={item.value}>
                <span>{item.label}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>

          <div className="admin-toolbar">
            <p>共 {bookings.length} 筆訂房申請</p>
            <button className="button button-small button-outline" type="button" onClick={loadBookings} disabled={listState === "loading"}>
              {listState === "loading" ? "更新中…" : "重新整理"}
            </button>
          </div>

          {listState === "loading" && bookings.length === 0 && <div className="admin-state" role="status">正在讀取訂房資料…</div>}
          {listState === "ready" && bookings.length === 0 && <div className="admin-state">目前還沒有訂房申請。</div>}

          {bookings.length > 0 && (
            <>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>建立時間</th><th>房型</th><th>入住</th><th>退房</th><th>人數</th><th>姓名</th><th>手機</th><th>Email</th><th>LINE ID</th><th>備註</th><th>狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{createdAtFormatter.format(new Date(booking.createdAt))}</td>
                        <td>{booking.roomName}</td><td>{booking.checkInDate}</td><td>{booking.checkOutDate}</td><td>{booking.guests}</td><td>{booking.customerName}</td><td>{booking.customerPhone}</td><td>{displayValue(booking.customerEmail)}</td><td>{displayValue(booking.lineId)}</td><td className="admin-note-cell">{displayValue(booking.note)}</td>
                        <td><StatusSelect booking={booking} updatingId={updatingId} onChange={handleStatusChange} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-cards">
                {bookings.map((booking) => (
                  <article className="admin-booking-card" key={booking.id}>
                    <header><div><span>{createdAtFormatter.format(new Date(booking.createdAt))}</span><h2>{booking.customerName}</h2></div><span className={`status-badge status-${booking.status}`}>{statusLabel(booking.status)}</span></header>
                    <dl>
                      <div><dt>房型</dt><dd>{booking.roomName}</dd></div><div><dt>入住／退房</dt><dd>{booking.checkInDate} → {booking.checkOutDate}</dd></div><div><dt>入住人數</dt><dd>{booking.guests} 人</dd></div><div><dt>手機</dt><dd>{booking.customerPhone}</dd></div><div><dt>Email</dt><dd>{displayValue(booking.customerEmail)}</dd></div><div><dt>LINE ID</dt><dd>{displayValue(booking.lineId)}</dd></div><div className="admin-card-wide"><dt>備註</dt><dd>{displayValue(booking.note)}</dd></div>
                    </dl>
                    <div className="admin-status-field"><span>訂單狀態</span><StatusSelect booking={booking} updatingId={updatingId} onChange={handleStatusChange} /></div>
                  </article>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

function StatusSelect({ booking, updatingId, onChange }: { booking: AdminBooking; updatingId: string; onChange: (id: string, status: BookingStatus) => void }) {
  return (
    <select
      className="admin-status-select"
      aria-label={`修改 ${booking.customerName} 的訂單狀態`}
      value={booking.status}
      disabled={updatingId === booking.id}
      onChange={(event) => onChange(booking.id, event.target.value as BookingStatus)}
    >
      {bookingStatusOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
    </select>
  );
}
