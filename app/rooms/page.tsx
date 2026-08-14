/* eslint-disable @next/next/no-img-element -- Static hospitality photography is served from the project public directory. */
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { stay } from "@/lib/site-data";

export const metadata: Metadata = { title: "空間介紹" };

export default function RoomsPage() {
  return (
    <>
      <PageHero eyebrow="THE STAY" title="一整套，只留給同行的你們。" description="Ohori Stay 是整套 2LDK 公寓，不與陌生旅客共享。一次僅接待一組、最多 6 人，適合家庭與朋友旅行。" index="02" />
      <section className="section-space stay-detail-section"><div className="section-shell">
        <div className="stay-detail-hero"><img src="/ohori-living-dining.png" alt="連結客廳、餐桌與廚房的公共空間" /><div><p className="eyebrow">LIVING & DINING</p><h2>聚在一起，也各自舒服。</h2><p>客餐廳串連完整廚房，是早晨準備早餐、晚上分享一天旅程的中心。空間完整獨享，孩子與長輩也能依自己的步調活動。</p></div></div>
        <div className="bedroom-grid">
          <article><img src="/ohori-bedroom-queen.png" alt="主臥室雙人床" /><p className="eyebrow">BEDROOM 01</p><h3>安靜主臥</h3><p>柔和採光與沉靜色調，讓長途旅行後能真正休息。</p></article>
          <article><img src="/ohori-bedroom-twin.png" alt="次臥室兩張單人床" /><p className="eyebrow">BEDROOM 02</p><h3>彈性次臥</h3><p>適合家人、朋友或孩子使用，依實際入住安排準備床位。</p></article>
        </div>
        <div className="room-common-note"><div><p className="eyebrow">AT A GLANCE</p><h2>{stay.layout}・最多 {stay.capacity} 人</h2></div><div className="pill-list">{stay.features.map((item) => <span key={item}>{item}</span>)}</div></div>
        <div className="center-action"><a className="button" href="/booking">查詢住宿日期</a></div>
      </div></section>
    </>
  );
}
