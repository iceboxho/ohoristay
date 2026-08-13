import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { facilities } from "@/lib/site-data";

export const metadata: Metadata = { title: "環境設施" };

export default function FacilitiesPage() {
  return (
    <>
      <PageHero eyebrow="FACILITIES" title="不多不少，剛好照顧旅途。" description="從進門到入睡，把每個使用頻率最高的細節準備好，讓短暫停留也有生活的完整感。" index="03" />
      <section className="section-space">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="facility-grid">
            {facilities.map((item) => <article key={item.number}><span>{item.number}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="facility-note-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:px-10">
          <p className="eyebrow">GOOD TO KNOW</p>
          <div><h2>讓每位旅人都住得安心。</h2><p>館內全面禁菸。備品數量依入住人數提供；若有嬰幼兒用品、長住清潔或其他需求，請在訂房時備註，我們會依現場條件協助確認。</p></div>
        </div>
      </section>
    </>
  );
}
