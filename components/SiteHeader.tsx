/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids a vinext production Link runtime failure. */
import { brand, navigation } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand-mark" href="/" aria-label={`${brand.name} 首頁`}>
          <span>{brand.name}</span><small>{brand.englishName}</small>
        </a>
        <nav className="desktop-nav" aria-label="主要選單">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          <a href="/admin/bookings">訂房管理</a>
          <a className="button button-small" href="/booking">線上訂房</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="開啟選單"><span /><span /></summary>
          <nav aria-label="手機版選單">
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
            <a href="/admin/bookings">訂房管理</a>
            <a className="button" href="/booking">線上訂房</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
