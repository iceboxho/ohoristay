import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RoomCard } from "@/components/RoomCard";
import { rooms } from "@/lib/site-data";

export const metadata: Metadata = { title: "房型介紹" };

export default function RoomsPage() {
  return (
    <>
      <PageHero eyebrow="ROOMS" title="選一間，剛好適合你的房。" description="三種尺度、同樣舒服。所有房型皆有獨立衛浴、料理空間與洗衣設備，適合短住，也適合多停留幾天。" index="02" />
      <section className="section-space rooms-page-section">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="room-grid room-grid-page">
            {rooms.map((room, index) => <RoomCard room={room} index={index} key={room.id} />)}
          </div>
          <div className="room-common-note">
            <p className="eyebrow">IN EVERY ROOM</p>
            <h2>每個房型，都準備好的事。</h2>
            <div className="pill-list">{["免費 Wi-Fi", "獨立空調", "洗衣機", "廚房與餐具", "毛巾與備品", "吹風機", "自助入住", "禁菸空間"].map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
