import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Ohori Stay｜福岡・大濠公園旁的日常旅居",
    template: "%s｜Ohori Stay",
  },
  description:
    "Ohori Stay 是位於福岡大濠公園生活圈的公寓式住宿，提供溫暖、簡潔且自在的城市旅居體驗。",
  openGraph: {
    title: "Ohori Stay｜福岡・大濠公園旁的日常旅居",
    description: "住進大濠，把旅途過成日常。",
    images: [{ url: "/ohori-stay-social.png", width: 1728, height: 910, alt: "Ohori Stay 日系公寓旅居空間" }],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ohori Stay｜福岡・大濠公園旁的日常旅居",
    description: "住進大濠，把旅途過成日常。",
    images: ["/ohori-stay-social.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
