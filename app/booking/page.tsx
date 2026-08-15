import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { PageHero } from "@/components/PageHero";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { brand } from "@/lib/site-data";

export const metadata: Metadata = { title: "線上訂房" };
type BookingPageProps = { searchParams?: Promise<{ room?: string; checkIn?: string; checkOut?: string; guests?: string }> };

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  return <><PageHero eyebrow="RESERVATION" title="把想住的日子，告訴我們。" description={`${brand.name}每次只接待一組、最多 6 人。填寫需求後，我們會確認日期、房況與完整費用。`} index="06" />
    <section className="booking-calendar-section section-space" id="availability"><div className="section-shell"><div className="section-heading-row"><div><p className="eyebrow">AVAILABILITY</p><h2>查看目前房況</h2></div><p className="muted-copy">已確認日期會顯示為已訂房；點選可入住日期，可帶入下方申請表。</p></div><AvailabilityCalendar compact /></div></section>
    <section className="booking-section section-space"><div className="section-shell booking-layout"><aside className="booking-aside"><p className="eyebrow">BEFORE YOU BOOK</p><h2>申請流程</h2><ol><li><span>1</span>填寫住宿需求</li><li><span>2</span>確認房況與費用</li><li><span>3</span>完成後續確認</li></ol><p className="aside-note">表單會安全送至我們的訂房系統，但不會在這一步收取任何款項。訂房需待人工確認後才正式成立。</p></aside><BookingForm initialRoom={params?.room} initialCheckIn={params?.checkIn} initialCheckOut={params?.checkOut} initialGuests={params?.guests} /></div></section>
  </>;
}
