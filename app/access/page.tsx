import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "交通資訊" };

export default function AccessPage() {
  return (
    <>
      <PageHero eyebrow="ACCESS" title="從機場抵達，也能很從容。" description="位於福岡市中央區大濠公園生活圈，鄰近地下鐵空港線。完成訂房後，我們會提供詳細地址與圖文入住路線。" index="04" />
      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-[1.05fr_0.95fr] md:px-10">
          <div className="access-map">
            <div className="access-water">OHORI<br /><small>PARK</small></div>
            <div className="access-line"><i /><i /><i /><i /></div>
            <span className="access-label label-airport">福岡空港</span>
            <span className="access-label label-hakata">博多</span>
            <span className="access-label label-tenjin">天神</span>
            <span className="access-label label-ohori">大濠公園</span>
          </div>
          <div className="route-list">
            <p className="eyebrow">BY SUBWAY</p>
            <h2>地下鐵空港線，一條線抵達。</h2>
            <article><span>FROM 01</span><div><h3>福岡機場</h3><p>搭乘空港線往姪濱方向，於大濠公園站下車；由車站步行約 8 分鐘。</p><strong>約 25 分鐘</strong></div></article>
            <article><span>FROM 02</span><div><h3>博多車站</h3><p>搭乘空港線往姪濱方向，無需轉乘即可抵達大濠公園站。</p><strong>約 20 分鐘</strong></div></article>
            <article><span>FROM 03</span><div><h3>天神</h3><p>搭乘空港線三站抵達，也可依天氣選擇散步或計程車。</p><strong>約 12 分鐘</strong></div></article>
          </div>
        </div>
      </section>
      <section className="access-tip"><div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-10"><p>詳細門牌與自助入住密碼，將於訂房確認後提供，以維護住客隱私與住宿安全。</p></div></section>
    </>
  );
}
