import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "關於我們" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="ABOUT US" title="一間讓旅行回到生活的住處。" description="我們相信，舒服的住宿不必過度堆疊，而是把光線、觸感與每一個日常動作都照顧好。" index="01" />
      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-2 md:px-10">
          <div className="story-art"><div className="story-circle" /><span>OHORI<br />STAY</span></div>
          <div className="prose-block">
            <p className="eyebrow">OUR STORY</p>
            <h2>從「如果在福岡有個家」開始。</h2>
            <p>Ohori Stay 的想法很簡單：讓第一次來福岡的人，也能很快找到自己的生活節奏。我們選擇大濠，是因為這裡有公園的安靜，也保有城市的便利。</p>
            <p>空間以米白、淺木與奶茶色為基調，不追求華麗，而是在床邊留一盞柔和的燈、在窗邊放一張能好好吃飯的桌子。希望你回到房間時，感受到的是安心，而不只是漂亮。</p>
          </div>
        </div>
      </section>
      <section className="values-section section-space">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="eyebrow">WHAT WE VALUE</p>
          <div className="values-grid">
            <article><span>一</span><h3>自然</h3><p>讓材質與光線自己說話，留下可以呼吸的空間。</p></article>
            <article><span>二</span><h3>真實</h3><p>提供真正用得到的設備，也清楚說明住宿的每件事。</p></article>
            <article><span>三</span><h3>在地</h3><p>從公園、市場到巷口小店，分享我們喜歡的福岡日常。</p></article>
          </div>
          <div className="center-action"><a className="button" href="/booking">預約一段福岡日常</a></div>
        </div>
      </section>
    </>
  );
}
