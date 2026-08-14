import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "交通資訊" };
const routes = [
  ["FROM 01", "福岡機場", "搭乘福岡市地下鐵機場線前往大濠一帶，再依確認信中的步行指引抵達。"],
  ["FROM 02", "博多站", "由博多站搭乘地下鐵機場線，不需轉乘即可前往大濠一帶。"],
  ["FROM 03", "天神", "從天神搭乘地下鐵，適合安排購物、用餐後返回住宿。"],
];
export default function AccessPage() {
  return <><PageHero eyebrow="ACCESS" title="靠近城市，也保留夜裡的安靜。" description="以大濠生活圈作為旅程的基地，往返福岡機場、博多與天神都方便。" index="04" />
    <section className="section-space"><div className="section-shell access-layout"><div className="access-place"><p className="eyebrow">OHORI AREA</p><h2>福岡市・大濠一帶</h2><p>為保護住客與鄰里的隱私，完整地址與最後步行路線會在訂房確認後提供。</p><a className="button button-outline" href="/booking">查詢可住日期</a></div><div className="route-list"><p className="eyebrow">BY SUBWAY</p>{routes.map(([number,title,text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="access-tip"><div className="narrow-shell text-center"><p>實際所需時間會依班次、轉乘與步行速度不同。確認訂房後，我們會提供較適合攜帶行李的路線。</p></div></section>
  </>;
}
