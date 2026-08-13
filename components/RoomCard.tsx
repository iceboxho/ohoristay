import Link from "next/link";
import type { rooms } from "@/lib/site-data";

type Room = (typeof rooms)[number];

export function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <article className="room-card">
      <div className={`room-visual room-visual-${room.tone}`}>
        <span>ROOM {String(index + 1).padStart(2, "0")}</span>
        <div className="room-window"><i /><i /><i /></div>
      </div>
      <div className="room-card-body">
        <div>
          <p className="room-japanese">{room.japanese}</p>
          <h3>{room.name}</h3>
          <p>{room.tagline}</p>
        </div>
        <dl>
          <div><dt>人數</dt><dd>{room.guests}</dd></div>
          <div><dt>床型</dt><dd>{room.beds}</dd></div>
          <div><dt>空間</dt><dd>{room.size}</dd></div>
        </dl>
        <div className="room-card-footer">
          <span>{room.price}<small>／晚・參考價</small></span>
          <Link className="text-link" href={`/booking?room=${room.id}`}>選擇房型 →</Link>
        </div>
      </div>
    </article>
  );
}
