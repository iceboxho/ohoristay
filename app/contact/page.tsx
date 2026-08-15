/* eslint-disable @next/next/no-img-element -- Static hospitality photography is served from the project public directory. */
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/lib/site-data";

export const metadata: Metadata = { title: "聯絡我們" };
export default function ContactPage() {
  return <><PageHero eyebrow="CONTACT" title="有想先確認的事，歡迎告訴我們。" description="住宿日期請直接使用訂房表單；其他交通、同行者或特殊需求，也可以先透過 Email 聯絡。" index="07" />
    <section className="section-space"><div className="section-shell contact-layout"><div className="contact-card"><p className="eyebrow">GET IN TOUCH</p><h2>{brand.name}</h2><dl><div><dt>EMAIL</dt><dd><a href="mailto:hello@ohoristay.jp">hello@ohoristay.jp</a></dd></div><div><dt>AREA</dt><dd>福岡市・大濠一帶</dd></div><div><dt>REPLY</dt><dd>通常於 1–2 個工作日內回覆</dd></div></dl><p>若要詢問房況，使用訂房申請能讓我們一次收到日期、人數與聯絡方式，回覆會更完整。</p><a className="button" href="/booking">填寫訂房申請</a></div><img src="/ohori-bedroom-queen.png" alt={`${brand.name}安靜的臥室`} /></div></section>
  </>;
}
