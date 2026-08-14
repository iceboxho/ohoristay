import type { Metadata } from "next";
import { AdminBookings } from "@/components/AdminBookings";

export const metadata: Metadata = {
  title: "訂房申請管理",
  robots: { index: false, follow: false },
};

export default function AdminBookingsPage() {
  return <AdminBookings />;
}
