import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "線上訂房" };

type BookingPageProps = { searchParams?: Promise<{ room?: string }> };

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  return (
    <>
      <PageHero eyebrow="RESERVATION" title="把想住的日子，告訴我們。" description="填寫以下資料送出房況申請。我們確認可入住後，會再提供完整價格與後續方式。" index="06" />
      <section className="booking-section section-space">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[0.72fr_1.28fr] md:px-10">
          <aside className="booking-aside">
            <p className="eyebrow">BEFORE YOU BOOK</p>
            <h2>申請流程</h2>
            <ol><li><span>1</span>填寫住宿需求</li><li><span>2</span>確認房況與費用</li><li><span>3</span>完成後續確認</li></ol>
            <p className="aside-note">目前為第一版預約流程，不會進行線上付款，也不會自動寫入資料庫。</p>
          </aside>
          <BookingForm initialRoom={params?.room ?? ""} />
        </div>
      </section>
    </>
  );
}
