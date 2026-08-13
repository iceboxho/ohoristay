import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "聯絡我們" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="CONTACT" title="有想問的事，歡迎寫給我們。" description="無論是住宿安排、房型選擇或特殊需求，我們都會在確認後盡快回覆。" index="07" />
      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[0.85fr_1.15fr] md:px-10">
          <div className="contact-card">
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>Ohori Stay</h2>
            <dl><div><dt>EMAIL</dt><dd><a href="mailto:hello@ohoristay.jp">hello@ohoristay.jp</a></dd></div><div><dt>AREA</dt><dd>福岡市中央區・大濠公園生活圈</dd></div><div><dt>REPLY</dt><dd>通常於 1–2 個工作日內回覆</dd></div></dl>
            <p>若已決定住宿日期，直接填寫訂房申請會更快完成房況確認。</p>
            <Link className="button" href="/booking">前往線上訂房</Link>
          </div>
          <div className="contact-message">
            <span>こんにちは</span>
            <h2>期待在福岡，<br />為你留一盞燈。</h2>
            <div className="contact-lines"><i /><i /><i /></div>
          </div>
        </div>
      </section>
    </>
  );
}
