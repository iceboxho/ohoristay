import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

/* eslint-disable @next/next/no-img-element -- Guest guide images are optimized static assets. */

export const metadata: Metadata = { title: "入住須知" };
const guideItems = [
  ["入住與退房", "入住與退房時間會在訂房確認時一併提供。若有晚班機或特殊抵達安排，請先在備註欄告知。"],
  ["一次一組・最多 6 人", "Ohori Stay 為整套 2LDK，每筆住宿只接待同一組旅客；實際入住人數不得超過 6 人。"],
  ["訂房成立方式", "送出表單是住宿申請，尚未代表訂房成立。我們確認日期與費用並完成後續確認後，訂房才正式成立。"],
  ["兒童與加床需求", "如有兒童同行、嬰幼兒用品或特殊床位安排，請在申請時備註，我們會依空間與安全條件回覆。"],
  ["室內禁菸與安寧", "室內全面禁菸。公寓位於生活社區，夜間請降低音量並遵守住宿確認信中的安寧規範。"],
  ["取消與變更", "取消、日期變更與退款條件以訂房確認時提供的內容為準；送出申請前如有疑問，歡迎先與我們聯絡。"],
];
export default function GuidePage() {
  return <><PageHero eyebrow="STAY GUIDE" title="入住前，先知道這些事。" description="清楚理解申請流程、入住人數與住宿規範，讓雙方都能放心確認每一趟旅程。" index="05" />
    <section className="section-space"><div className="narrow-shell"><div className="guide-list">{guideItems.map(([title,content], index) => <details key={title} open={index===0}><summary><span>{String(index+1).padStart(2,"0")}</span>{title}<i>＋</i></summary><p>{content}</p></details>)}</div><div className="guide-cta"><p>還有想先確認的事情嗎？</p><a className="text-link" href="/contact">聯絡我們 →</a><a className="button" href="/booking">前往訂房申請</a></div></div></section>
    <section className="guest-guide-section section-space"><div className="section-shell"><div className="section-heading-row"><div><p className="eyebrow">GUEST GUIDE</p><h2>入住與退房圖解</h2></div><p className="muted-copy">請在入住前與退房當天詳閱。點選圖片可開啟原尺寸查看。</p></div><div className="guest-guide-grid">
      <figure><a href="/801-check-in-guide.webp" target="_blank" rel="noreferrer"><img src="/801-check-in-guide.webp" alt="801 入住指南：垃圾分類、生活公約與設備使用說明" /></a><figcaption><span>01</span><div><h3>入住指南</h3><p>垃圾分類、生活公約與房內設備使用說明</p></div><a className="text-link" href="/801-check-in-guide.webp" target="_blank" rel="noreferrer">放大查看 →</a></figcaption></figure>
      <figure><a href="/801-check-out-guide.webp" target="_blank" rel="noreferrer"><img src="/801-check-out-guide.webp" alt="801 退房指南：環境整理、用電瓦斯安全與離場確認" /></a><figcaption><span>02</span><div><h3>退房指南</h3><p>環境整理、用電瓦斯安全與離場確認</p></div><a className="text-link" href="/801-check-out-guide.webp" target="_blank" rel="noreferrer">放大查看 →</a></figcaption></figure>
    </div></div></section>
  </>;
}
