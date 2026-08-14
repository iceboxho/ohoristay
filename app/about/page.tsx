/* eslint-disable @next/next/no-img-element -- Static hospitality photography is served from the project public directory. */
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "關於我們" };

export default function AboutPage() {
  return <><PageHero eyebrow="ABOUT US" title="讓住宿，成為旅行中安心的日常。" description="我們把 Ohori Stay 規劃成一個能一起生活的完整住所，而不只是分散的睡眠空間。" index="01" />
    <section className="section-space"><div className="section-shell editorial-split"><img src="/ohori-living-dining.png" alt="Ohori Stay 溫暖的共同生活空間" /><div className="prose-block"><p className="eyebrow">OUR STORY</p><h2>留給一組旅客，<br />也留出真正放鬆的空間。</h2><p>旅行裡最珍貴的，往往是一起吃早餐、回家後聊天，以及不需要趕著離開的片刻。Ohori Stay 以整套 2LDK 的方式接待，每次只迎接一組旅客，讓同行的家人朋友能自在相聚。</p><p>我們重視乾淨、安靜與清楚的溝通。從入住前的指引到住宿中的生活設備，都希望讓第一次來到福岡的人，也能像回到自己的住所一樣從容。</p></div></div></section>
    <section className="values-section section-space"><div className="section-shell"><p className="eyebrow">WHAT WE VALUE</p><div className="values-grid"><article><span>01</span><h3>完整隱私</h3><p>不與陌生旅客共用空間，一次只接待一組。</p></article><article><span>02</span><h3>真實生活</h3><p>用餐、料理、洗衣與休息，都能在同一個家裡完成。</p></article><article><span>03</span><h3>清楚安心</h3><p>訂房後由我們確認房況、費用與入住方式，減少不確定。</p></article></div><div className="center-action"><a className="button" href="/booking">提出住宿申請</a></div></div></section>
  </>;
}
