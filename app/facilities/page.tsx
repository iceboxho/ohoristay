import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { facilities } from "@/lib/site-data";

export const metadata: Metadata = { title: "環境設施" };
export default function FacilitiesPage() {
  return <><PageHero eyebrow="FACILITIES" title="從起床到入睡，都有生活的餘裕。" description="為最多 6 人同行準備的完整住所：能一起吃飯，也能分開休息；短住方便，多住幾天也自在。" index="03" />
    <section className="section-space"><div className="section-shell"><div className="facility-grid">{facilities.map((item) => <article key={item.number}><span>{item.number}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}</div></div></section>
    <section className="facility-note-section"><div className="section-shell facility-note"><p className="eyebrow">GOOD TO KNOW</p><div><h2>整套禁菸，並請一起愛惜這個家。</h2><p>實際備品、床位安排與入住方式，會依訂單與入住人數提供確認資訊。如有幼兒、長輩或其他特殊需求，請在訂房表單備註，我們會在確認房況時一併回覆。</p></div></div></section>
  </>;
}
