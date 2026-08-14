/* eslint-disable @next/next/no-img-element -- Static hospitality photography is served from the project public directory. */
import { facilities, stay } from "@/lib/site-data";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";

function QuickBookingBar() {
  return (
    <form className="quick-booking" action="/booking#availability" method="get">
      <label><span>入住日期</span><input name="checkIn" type="date" aria-label="入住日期" /></label>
      <label><span>退房日期</span><input name="checkOut" type="date" aria-label="退房日期" /></label>
      <label><span>入住人數</span><select name="guests" defaultValue="2" aria-label="入住人數">{[1,2,3,4,5,6].map((n) => <option value={n} key={n}>{n} 人</option>)}</select></label>
      <button type="submit">查看住宿日期</button>
    </form>
  );
}

export default function Home() {
  return (
    <>
      <section className="immersive-hero">
        <img className="immersive-hero-image" src="/ohori-living-dining.png" alt="Ohori Stay 採光明亮的客餐廳與廚房" />
        <div className="immersive-hero-shade" />
        <div className="immersive-hero-copy">
          <p className="eyebrow">FUKUOKA · OHORI</p>
          <h1>住進大濠，<br />擁有一段福岡日常</h1>
          <p>{stay.layout}・一次一組・最多 {stay.capacity} 人</p>
          <a className="text-link" href="/rooms">走進 Ohori Stay →</a>
        </div>
        <QuickBookingBar />
      </section>

      <section className="intro-section section-space">
        <div className="section-shell intro-layout">
          <div><p className="eyebrow">ONE HOME, ONE GROUP</p><span className="section-number">01</span></div>
          <div>
            <h2>不是分租的房間，<br />是一整個只屬於你們的家。</h2>
            <div className="intro-copy"><p>一天只接待一組旅客。兩間臥室、客餐廳、廚房與衛浴完整保留給您和同行家人朋友，在福岡也能好好吃飯、自在聊天、安心休息。</p><a className="text-link" href="/about">認識我們 →</a></div>
          </div>
        </div>
      </section>

      <section className="availability-section section-space">
        <div className="section-shell availability-layout">
          <div className="availability-copy"><p className="eyebrow">STAY CALENDAR</p><h2>先看空閒日期，<br />再安排福岡旅程。</h2><p>月曆會顯示已確認的住宿日期。可入住日期可以直接點選，並帶入線上訂房申請。</p></div>
          <AvailabilityCalendar />
        </div>
      </section>

      <section className="stay-preview section-space">
        <div className="section-shell">
          <div className="section-heading-row"><div><p className="eyebrow">THE STAY</p><h2>一套 2LDK，盛放旅程裡的相聚。</h2></div><a className="text-link" href="/rooms">完整空間介紹 →</a></div>
          <div className="stay-gallery">
            <figure className="stay-gallery-main"><img src="/ohori-living-dining.png" alt="Ohori Stay 客餐廳與完整廚房" /><figcaption>客餐廳與廚房</figcaption></figure>
            <figure><img src="/ohori-bedroom-queen.png" alt="Ohori Stay 主臥室" /><figcaption>主臥室</figcaption></figure>
            <figure><img src="/ohori-bedroom-twin.png" alt="Ohori Stay 次臥室" /><figcaption>次臥室</figcaption></figure>
          </div>
          <div className="stay-facts">
            <div><small>TYPE</small><strong>{stay.layout}</strong></div><div><small>CAPACITY</small><strong>{stay.guests}</strong></div><div><small>PRIVACY</small><strong>一次一組</strong></div><div><small>BEDROOMS</small><strong>{stay.bedrooms}</strong></div>
          </div>
        </div>
      </section>

      <section className="facility-home section-space">
        <div className="section-shell facility-home-layout">
          <div><p className="eyebrow">THOUGHTFUL DETAILS</p><h2>為真正的生活，<br />準備剛剛好的設備。</h2><p className="muted-copy">不只是一晚的睡眠，也照顧一家人或朋友同行時的日常節奏。</p><a className="button button-outline" href="/facilities">查看全部設施</a></div>
          <div className="facility-preview">{facilities.slice(0,4).map((item) => <article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="location-band">
        <div className="section-shell location-layout">
          <div><p className="eyebrow">LOCATION</p><h2>在大濠的安靜，<br />與福岡的便利之間。</h2></div>
          <div><p>早晨到大濠公園散步，白天前往天神與博多，晚上回到完整而安靜的住所。詳細地址與入住路線會在訂房確認後提供。</p><a className="text-link text-link-light" href="/access">查看交通資訊 →</a></div>
        </div>
      </section>

      <section className="booking-cta section-space"><div className="narrow-shell text-center"><p className="eyebrow">RESERVATION</p><h2>下一段福岡日常，從這裡開始。</h2><p>送出住宿需求後，我們會儘快確認日期、房況與完整費用。</p><a className="button" href="/booking">開始訂房申請</a></div></section>
    </>
  );
}
