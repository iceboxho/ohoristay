import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Ohori Stay｜福岡大濠的整套 2LDK 住宿", template: "%s｜Ohori Stay" },
  description: "Ohori Stay 是福岡大濠一帶的整套 2LDK 住宿，一次只接待一組旅客，最多 6 人，適合家庭與朋友同行。",
  openGraph: {
    title: "Ohori Stay｜福岡大濠的整套 2LDK 住宿",
    description: "一次一組、最多 6 人，在公園與城市之間住進一段福岡日常。",
    images: [{ url: "/ohori-living-dining.png", width: 1536, height: 1024, alt: "Ohori Stay 明亮溫暖的客餐廳" }],
    locale: "zh_TW",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Ohori Stay｜福岡大濠的整套 2LDK 住宿", description: "一次一組、最多 6 人，在公園與城市之間住進一段福岡日常。", images: ["/ohori-living-dining.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
