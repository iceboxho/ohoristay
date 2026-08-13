import Link from "next/link";
import { navigation } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link className="brand-mark" href="/" aria-label="Ohori Stay 首頁">
          <span>OHORI</span>
          <small>STAY</small>
        </Link>

        <nav className="desktop-nav" aria-label="主要選單">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
          <Link className="button button-small" href="/booking">線上訂房</Link>
        </nav>

        <details className="mobile-menu">
          <summary aria-label="開啟選單"><span /><span /></summary>
          <nav aria-label="手機版選單">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
            <Link className="button" href="/booking">線上訂房</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
