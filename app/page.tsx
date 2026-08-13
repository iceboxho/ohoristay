import { RoomCard } from "@/components/RoomCard";
import { facilities, rooms } from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-24">
          <div className="hero-copy">
            <p className="eyebrow">FUKUOKA · OHORI</p>
            <h1>住進大濠，<br />把旅途過成日常。</h1>
            <p className="hero-lead">
              在公園與城市之間，留一處溫暖、乾淨的生活空間。慢慢醒來、好好吃飯，像在福岡擁有自己的家。
            </p>
            <div className="hero-actions">
              <a className="button" href="/booking">查詢住宿日期</a>
              <a className="text-link" href="/rooms">看看房型 →</a>
            </div>
            <div className="hero-note"><span /> 公寓式住宿・全房型獨立衛浴</div>
          </div>

          <div className="hero-art" aria-label="以日式窗格與木質空間構成的 Ohori Stay 品牌意象">
            <div className="hero-sun" />
            <div className="hero-shoji"><i /><i /><i /><i /></div>
            <div className="hero-bed"><span /></div>
            <p>静かな時間<br /><small>A QUIET PLACE TO STAY</small></p>
          </div>
        </div>
        <div className="hero-scroll">SCROLL <span /></div>
      </section>

      <section className="intro-section section-space">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[0.72fr_1.28fr] md:px-10">
          <div>
            <p className="eyebrow">OUR PHILOSOPHY</p>
            <span className="section-number">01</span>
          </div>
          <div>
            <h2>少一點匆忙，<br />多一點生活的餘白。</h2>
            <div className="intro-copy">
              <p>Ohori Stay 不是只用來睡一晚的房間。我們把旅行真正需要的事，藏進舒服的尺度裡：可以料理的廚房、可以坐下的餐桌，以及讓身體慢慢放鬆的自然色調。</p>
              <a className="text-link" href="/about">認識 Ohori Stay →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="rooms-section section-space">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="section-heading-row">
            <div><p className="eyebrow">OUR ROOMS</p><h2>選一間，適合此刻的房。</h2></div>
            <a className="text-link" href="/rooms">查看全部房型 →</a>
          </div>
          <div className="room-grid">
            {rooms.map((room, index) => <RoomCard room={room} index={index} key={room.id} />)}
          </div>
        </div>
      </section>

      <section className="feature-band section-space">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-10">
          <div className="feature-art">
            <div className="feature-arch"><span>OHORI</span></div>
            <p>暮らすように旅する</p>
          </div>
          <div>
            <p className="eyebrow">THOUGHTFUL DETAILS</p>
            <h2>剛剛好的設備，<br />照顧每一天的起居。</h2>
            <div className="facility-preview">
              {facilities.slice(0, 4).map((item) => (
                <div key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>
              ))}
            </div>
            <a className="button button-outline" href="/facilities">查看環境設施</a>
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="location-copy px-5 py-20 md:px-16 md:py-28">
            <p className="eyebrow">LOCATION</p>
            <h2>離城市很近，<br />離日常也很近。</h2>
            <p>早晨繞著大濠公園散步，午後搭地鐵進天神，晚上回到巷弄裡吃一頓家常料理。Ohori Stay 是探索福岡，也能安心回來的位置。</p>
            <div className="location-stats">
              <div><strong>8</strong><span>分鐘<br />步行至地鐵站</span></div>
              <div><strong>12</strong><span>分鐘<br />地鐵至博多</span></div>
            </div>
            <a className="text-link text-link-light" href="/access">查看交通方式 →</a>
          </div>
          <div className="map-art" aria-label="Ohori Stay 與大濠公園的概念位置圖">
            <div className="map-water"><span>大濠公園<br /><small>OHORI PARK</small></span></div>
            <div className="map-road road-one" /><div className="map-road road-two" />
            <div className="map-pin"><i />OHORI STAY</div>
          </div>
        </div>
      </section>

      <section className="booking-cta section-space">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
          <p className="eyebrow">RESERVATION</p>
          <h2>準備好，在福岡慢下來了嗎？</h2>
          <p>送出住宿需求後，我們會儘快確認房況與完整價格。</p>
          <a className="button" href="/booking">開始訂房申請</a>
        </div>
      </section>
    </>
  );
}
