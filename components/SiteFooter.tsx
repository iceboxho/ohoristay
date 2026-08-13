/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids a vinext production Link runtime failure. */
import { navigation } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.15fr_1fr_1fr] md:px-10">
        <div>
          <a className="brand-mark brand-mark-light" href="/">
            <span>OHORI</span><small>STAY</small>
          </a>
          <p>把福岡的一段日常，留給慢慢生活的你。</p>
        </div>
        <div>
          <p className="footer-label">EXPLORE</p>
          <div className="footer-links">
            {navigation.slice(0, 4).map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-label">CONTACT</p>
          <p>福岡市中央區・大濠公園生活圈</p>
          <p>hello@ohoristay.jp</p>
          <a className="text-link text-link-light" href="/contact">聯絡我們 →</a>
        </div>
      </div>
      <div className="footer-bottom mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5 py-5 md:px-10">
        <span>© {new Date().getFullYear()} Ohori Stay</span>
        <span>Fukuoka, Japan</span>
      </div>
    </footer>
  );
}
