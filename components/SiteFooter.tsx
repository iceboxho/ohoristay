/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids a vinext production Link runtime failure. */
import { navigation } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <a className="brand-mark brand-mark-light" href="/"><span>OHORI</span><small>STAY</small></a>
          <p>福岡大濠一帶的整套 2LDK 住宿。一次只接待一組旅客，最多 6 人。</p>
        </div>
        <div>
          <p className="footer-label">EXPLORE</p>
          <div className="footer-links">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
        </div>
        <div>
          <p className="footer-label">CONTACT</p>
          <p>Fukuoka · Ohori Area</p>
          <p><a href="mailto:hello@ohoristay.jp">hello@ohoristay.jp</a></p>
          <a className="text-link text-link-light" href="/contact">聯絡 Ohori Stay →</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ohori Stay</span><span>Fukuoka, Japan</span></div>
    </footer>
  );
}
