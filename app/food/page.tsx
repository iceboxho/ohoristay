import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "附近美食",
  description: "大濠・捌零壹住客適用的大濠公園周邊早餐、咖啡、正餐與特色餐廳推薦。",
};

const recommendations = [
  {
    number: "01",
    category: "MORNING COFFEE",
    name: "Starbucks 福岡大濠公園店",
    location: "公園內・大濠公園站步行約 8 分",
    bestFor: "早晨散步、外帶咖啡",
    description: "位在大濠公園裡，大片窗景與木質空間很適合從一杯咖啡開始一天，也方便帶著飲品沿湖散步。",
    officialUrl: "https://store.starbucks.co.jp/detail-962/",
  },
  {
    number: "02",
    category: "BAKERY",
    name: "シモン本店（Simon）",
    location: "港區・大濠公園站步行約 7 分",
    bestFor: "早餐麵包、帶回住宿",
    description: "天然酵母與石窯烘焙的在地麵包店，適合早上買回住宿搭配咖啡，也很適合準備隔天的簡單早餐。",
    officialUrl: "https://www.shi-mon.co.jp/",
  },
  {
    number: "03",
    category: "YAME TEA & LIGHT MEAL",
    name: "&LOCALS 大濠公園",
    location: "大濠公園南側・日本庭園旁",
    bestFor: "八女茶、輕食、甜點",
    description: "以八女茶和九州在地食材為主題，可安排在日本庭園前後享用茶飲、定食或甜點，氣氛安靜舒適。",
    officialUrl: "https://andlocals.jp/",
  },
  {
    number: "04",
    category: "PARK-SIDE DINING",
    name: "Royal Garden Cafe 大濠公園",
    location: "公園內・Boathouse 1F",
    bestFor: "家庭午餐、湖景晚餐",
    description: "玻璃窗與露台面向公園，菜單選擇較完整，適合一家人或朋友想坐下來慢慢吃一頓飯的時候。",
    officialUrl: "https://www.oohoriboathouse.jp/royal-garden-cafe/",
  },
  {
    number: "05",
    category: "SPECIAL DINNER",
    name: "大濠うなぎ",
    location: "大濠東側・赤坂方向",
    bestFor: "鰻魚料理、預約晚餐",
    description: "以鰻重、釜飯與季節套餐為主，適合想安排一餐較正式的日式料理；部分套餐需要提前預約。",
    officialUrl: "https://ohoriunagi.com/",
  },
  {
    number: "06",
    category: "CELEBRATION",
    name: "レストラン花の木（Hananoki）",
    location: "公園內・Boathouse 2F",
    bestFor: "紀念日、景觀法式料理",
    description: "面向大濠公園的老字號法式餐廳，適合生日、紀念日或旅途中想安排一頓特別晚餐的場合，建議事先預約。",
    officialUrl: "https://hananoki-f.jp/",
  },
] as const;

function googleMapsUrl(name: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} 福岡`)}`;
}

export default function FoodPage() {
  return (
    <>
      <PageHero
        eyebrow="LOCAL FOOD GUIDE"
        title="從早餐到晚餐，吃進大濠的日常。"
        description="以大濠公園與大濠公園站為基準，整理適合散步、家庭同行與特別晚餐的附近選擇。"
        index="05"
      />

      <section className="food-guide-section section-space">
        <div className="section-shell">
          <div className="food-guide-intro">
            <div>
              <p className="eyebrow">OUR SHORTLIST</p>
              <h2>依今天的行程，<br />挑一間剛剛好的店。</h2>
            </div>
            <div>
              <p>推薦範圍以大濠公園生活圈為主。住宿完整地址會在訂房確認後提供，因此頁面上的距離以大濠公園站或公園內位置作為參考。</p>
              <p className="food-guide-update">資料確認日期：2026 年 8 月 15 日。臨時休業、訂位規則及營業時間可能調整，出發前請查看店家官方資訊。</p>
            </div>
          </div>

          <div className="food-grid">
            {recommendations.map((spot) => (
              <article className="food-card" key={spot.name}>
                <div className="food-card-heading">
                  <span>{spot.number}</span>
                  <p>{spot.category}</p>
                </div>
                <h2>{spot.name}</h2>
                <dl>
                  <div><dt>位置</dt><dd>{spot.location}</dd></div>
                  <div><dt>適合</dt><dd>{spot.bestFor}</dd></div>
                </dl>
                <p className="food-card-description">{spot.description}</p>
                <div className="food-card-actions">
                  <a className="text-link" href={googleMapsUrl(spot.name)} target="_blank" rel="noreferrer">開啟地圖 →</a>
                  <a className="text-link" href={spot.officialUrl} target="_blank" rel="noreferrer">官方資訊 →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="food-guide-note">
        <div className="narrow-shell text-center">
          <p className="eyebrow">A SMALL REMINDER</p>
          <h2>熱門店家，先確認再出發。</h2>
          <p>週末、國定假日與活動期間較容易客滿；若有兒童座椅、過敏原、素食或無障礙需求，建議直接向店家確認。</p>
          <a className="button" href="/booking">查看住宿日期</a>
        </div>
      </section>
    </>
  );
}
