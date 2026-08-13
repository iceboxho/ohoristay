import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "訂房須知" };

const guideItems = [
  ["入住與退房", "入住時間為 16:00 後，退房時間為 11:00 前。住宿採自助入住，確認訂房後會寄送完整流程。"],
  ["訂房成立", "線上表單為房況申請，不代表訂房完成。收到房況、費用與付款方式確認後，訂房才會正式成立。"],
  ["取消與變更", "第一版網站尚未開放線上付款；正式取消政策將於報價確認時一併提供，請在同意後再完成訂房。"],
  ["兒童入住", "兒童亦計入住人數。若需要嬰兒床、床圍或其他用品，請先於備註欄詢問，我們會依房型協助確認。"],
  ["住宿規範", "全館禁菸、禁止攜帶寵物與舉辦派對。夜間請降低音量，共同維護鄰里與其他住客的安寧。"],
  ["清潔與備品", "入住前會完成客房清潔。連住期間不提供每日清掃；如有長住需求，可另行詢問清潔安排。"],
];

export default function GuidePage() {
  return (
    <>
      <PageHero eyebrow="BOOKING GUIDE" title="訂房以前，先讀一點重要的事。" description="清楚的規則，讓彼此都更安心。以下為第一版住宿說明；實際費用與細節會在訂房確認時再次告知。" index="05" />
      <section className="section-space">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="guide-list">
            {guideItems.map(([title, content], index) => (
              <details key={title} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{title}<i>＋</i></summary><p>{content}</p></details>
            ))}
          </div>
          <div className="guide-cta"><p>還有其他想確認的事嗎？</p><Link className="text-link" href="/contact">聯絡我們 →</Link><Link className="button" href="/booking">開始訂房申請</Link></div>
        </div>
      </section>
    </>
  );
}
