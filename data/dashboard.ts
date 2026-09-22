export const topStats = {
  todaySales: { value: 4280000, changePct: 18.4 },
  monthSales: { value: 86420000, changePct: 12.1 },
  orders: { value: 248, changePct: 9.6 },
  avgCheck: { value: 348468, changePct: -2.3 }
};

export const salesDynamics: { date: string; label: string; value: number }[] = [
  { date: "2026-09-05", label: "5 sen", value: 2140000 },
  { date: "2026-09-06", label: "6 sen", value: 3320000 },
  { date: "2026-09-07", label: "7 sen", value: 2870000 },
  { date: "2026-09-08", label: "8 sen", value: 3960000 },
  { date: "2026-09-09", label: "9 sen", value: 3510000 },
  { date: "2026-09-10", label: "10 sen", value: 4120000 },
  { date: "2026-09-11", label: "11 sen", value: 3680000 },
  { date: "2026-09-12", label: "12 sen", value: 4460000 },
  { date: "2026-09-13", label: "13 sen", value: 3290000 },
  { date: "2026-09-14", label: "14 sen", value: 3870000 },
  { date: "2026-09-15", label: "15 sen", value: 4510000 },
  { date: "2026-09-16", label: "16 sen", value: 3940000 },
  { date: "2026-09-17", label: "17 sen", value: 4670000 },
  { date: "2026-09-18", label: "18 sen", value: 3980000 },
  { date: "2026-09-19", label: "19 sen", value: 4280000 }
];

export const actionCenter = [
  { label: "mahsulot — zaxira juda kam", count: 3, href: "/admin/inventory?filter=kam" },
  { label: "to'lov — tasdiqlash kutilmoqda", count: 7, href: "/admin/orders?filter=tolov_kutilmoqda" },
  { label: "buyurtma — tayyorlash kerak", count: 12, href: "/admin/orders?filter=tayyorlanmoqda" },
  { label: "mahsulot — oxirgi 7 kunda tez sotilmoqda", count: 5, href: "/admin/reports" },
  { label: "mahsulot — 30 kundan beri sotilmagan", count: 8, href: "/admin/inventory?filter=sekin" }
];

export const fastSelling = [
  { name: "Klassik charm tufli", weekSales: 42, revenue: 19278000, stock: 3, speed: "~1 kun" },
  { name: "Atlas ko'ylak", weekSales: 36, revenue: 14004000, stock: 8, speed: "~5 kun" },
  { name: "Mini sumka", weekSales: 29, revenue: 8091000, stock: 2, speed: "~1–2 kun" },
  { name: "New Balance 9060 — Shokolad", weekSales: 6, revenue: 2400000, stock: 2, speed: "~3 kun" },
  { name: "Klassik loafer — Jigarrang", weekSales: 8, revenue: 2800000, stock: 18, speed: "~9 kun" }
];

export const slowMoving = [
  { name: "Klassik jinsi shim", monthSales: 1, stock: 24 },
  { name: "Klassik ko'ylak", monthSales: 3, stock: 31 },
  { name: "Kamar", monthSales: 4, stock: 15 },
  { name: "Charm sumka", monthSales: 6, stock: 7 }
];

export const sizeAnalytics = [
  { size: "36", count: 8 },
  { size: "37", count: 11 },
  { size: "38", count: 14 },
  { size: "39", count: 10 },
  { size: "40", count: 5 }
];

export const colorAnalytics = [
  { color: "Qora", pct: 42 },
  { color: "Oq", pct: 27 },
  { color: "Bej", pct: 18 },
  { color: "Jigarrang", pct: 9 },
  { color: "Boshqa", pct: 4 }
];

export const salesChannels = [
  { channel: "Instagram", orders: 151, pct: 61 },
  { channel: "Telegram", orders: 59, pct: 24 },
  { channel: "Sayt", orders: 38, pct: 15 }
];
