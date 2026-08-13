export const navigation = [
  { href: "/about", label: "關於我們" },
  { href: "/rooms", label: "房型介紹" },
  { href: "/facilities", label: "環境設施" },
  { href: "/access", label: "交通資訊" },
  { href: "/guide", label: "訂房須知" },
  { href: "/contact", label: "聯絡我們" },
];

export const rooms = [
  {
    id: "kinari",
    name: "KINARI Studio",
    japanese: "きなり",
    tagline: "留白剛好的兩人小宅",
    guests: "1–2 人",
    beds: "一張雙人床",
    size: "約 26 m²",
    price: "¥12,800 起",
    tone: "sand",
    features: ["簡易廚房", "獨立衛浴", "工作餐桌", "洗衣機"],
  },
  {
    id: "nagi",
    name: "NAGI Family",
    japanese: "なぎ",
    tagline: "讓家人也能慢慢住下來",
    guests: "2–4 人",
    beds: "兩張雙人床",
    size: "約 38 m²",
    price: "¥18,600 起",
    tone: "wood",
    features: ["完整廚房", "乾濕分離衛浴", "四人餐桌", "洗衣機"],
  },
  {
    id: "tsuki",
    name: "TSUKI Corner",
    japanese: "つき",
    tagline: "在轉角窗邊看城市入夜",
    guests: "1–3 人",
    beds: "雙人床＋沙發床",
    size: "約 32 m²",
    price: "¥15,200 起",
    tone: "tea",
    features: ["轉角採光", "簡易廚房", "閱讀沙發", "洗衣機"],
  },
] as const;

export const facilities = [
  { number: "01", title: "自助入住", text: "抵達前提供入住指引，保留旅行節奏，也避免排隊等候。" },
  { number: "02", title: "房內廚房", text: "基本鍋具、餐具與冰箱齊備，適合早餐或簡單料理。" },
  { number: "03", title: "洗衣設備", text: "每間客房皆有洗衣機，長住與親子旅行都更輕鬆。" },
  { number: "04", title: "高速 Wi-Fi", text: "從查路線到遠端工作，都能維持穩定連線。" },
  { number: "05", title: "生活備品", text: "毛巾、盥洗用品與吹風機依入住人數準備。" },
  { number: "06", title: "在地指南", text: "整理步行可達的咖啡、超市與散步路線，住進福岡日常。" },
];
