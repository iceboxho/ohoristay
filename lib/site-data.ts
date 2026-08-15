export const navigation = [
  { href: "/about", label: "關於我們" },
  { href: "/rooms", label: "空間介紹" },
  { href: "/facilities", label: "環境設施" },
  { href: "/access", label: "交通資訊" },
  { href: "/food", label: "附近美食" },
  { href: "/guide", label: "入住須知" },
  { href: "/contact", label: "聯絡我們" },
];

export const brand = {
  name: "大濠・捌零壹",
  englishName: "OHORI 801",
  roomName: "大濠・捌零壹 2LDK",
} as const;

export const stay = {
  name: brand.roomName,
  slug: "ohori-stay-2ldk",
  tagline: "像住進自己的福岡日常",
  guests: "1–6 人",
  capacity: 6,
  layout: "整套 2LDK",
  bedrooms: "2 間臥室",
  bath: "獨立衛浴",
  features: ["客餐廳", "完整廚房", "洗衣設備", "高速 Wi-Fi", "自助入住", "全室禁菸"],
} as const;

export const facilities = [
  { number: "01", title: "整套獨享", text: "每次只接待一組旅客，客餐廳、廚房與兩間臥室都只屬於您同行的家人朋友。" },
  { number: "02", title: "完整廚房", text: "冰箱、爐具、基本鍋具與六人份餐具齊備，早餐與簡單料理都很方便。" },
  { number: "03", title: "洗衣設備", text: "房內備有洗衣設備，適合親子旅程、多日住宿與輕裝旅行。" },
  { number: "04", title: "高速 Wi-Fi", text: "查路線、分享旅程或短時間遠端工作，都能維持穩定連線。" },
  { number: "05", title: "生活備品", text: "依入住人數準備毛巾、盥洗用品與吹風機，減少行李負擔。" },
  { number: "06", title: "自助入住", text: "抵達前提供清楚的入住指引，晚班機或不同旅行節奏也能從容入住。" },
];
