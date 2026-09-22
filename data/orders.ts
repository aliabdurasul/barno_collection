import { Order } from "@/types";

export const initialOrders: Order[] = [
  {
    id: "BN-1025", customerName: "Dilnoza Karimova", phone: "+998 90 111 22 33",
    address: "Chilonzor tumani, 12-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p08", name: "New Balance 9060 — Shokolad", image: "/products/nb9060-choco.png", color: "Shokolad", size: "36", qty: 1, price: 400000 }],
    subtotal: 400000, deliveryFee: 25000, total: 425000,
    paymentStatus: "tasdiqlangan", orderStatus: "yetkazildi", source: "instagram", createdAt: "2026-09-08T10:12:00"
  },
  {
    id: "BN-1026", customerName: "Malika Yusupova", phone: "+998 91 222 33 44",
    address: "Yunusobod tumani, 45-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p01", name: "Atlas ko'ylak", image: "", color: "Bej", size: "M", qty: 1, price: 389000 }],
    subtotal: 389000, deliveryFee: 25000, total: 414000,
    paymentStatus: "tasdiqlangan", orderStatus: "yetkazildi", source: "instagram", createdAt: "2026-09-08T14:40:00"
  },
  {
    id: "BN-1027", customerName: "Nodira Abdullayeva", phone: "+998 93 333 44 55",
    address: "Mirzo Ulug'bek tumani, 7-uy", city: "Toshkent", deliveryType: "olib_ketish",
    items: [
      { productId: "p12", name: "Klassik charm tufli", image: "", color: "Qora", size: "38", qty: 1, price: 459000 },
      { productId: "p17", name: "Ipak sharf", image: "", color: "Bej naqsh", size: "Standart", qty: 1, price: 165000 }
    ],
    subtotal: 624000, deliveryFee: 0, total: 624000,
    paymentStatus: "tasdiqlangan", orderStatus: "yetkazildi", source: "telegram", createdAt: "2026-09-09T09:05:00"
  },
  {
    id: "BN-1028", customerName: "Sevinch Raxmonova", phone: "+998 94 444 55 66",
    address: "Sergeli tumani, 21-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p14", name: "Mini sumka", image: "", color: "Qora", size: "Standart", qty: 1, price: 279000 }],
    subtotal: 279000, deliveryFee: 25000, total: 304000,
    paymentStatus: "tasdiqlangan", orderStatus: "yetkazildi", source: "instagram", createdAt: "2026-09-09T16:22:00"
  },
  {
    id: "BN-1029", customerName: "Gulnoza Tosheva", phone: "+998 90 555 66 77",
    address: "Bektemir tumani, 3-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p09", name: "New Balance 9060 — Pushti", image: "/products/nb9060-pink.png", color: "Pushti", size: "37", qty: 1, price: 420000 }],
    subtotal: 420000, deliveryFee: 25000, total: 445000,
    paymentStatus: "tasdiqlangan", orderStatus: "kuryerga_berildi", source: "instagram", createdAt: "2026-09-10T11:00:00"
  },
  {
    id: "BN-1030", customerName: "Madina Nazarova", phone: "+998 97 666 77 88",
    address: "Shayxontohur tumani, 18-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p10", name: "Klassik loafer — Jigarrang", image: "/products/loafer-brown.png", color: "Jigarrang", size: "38", qty: 1, price: 350000 }],
    subtotal: 350000, deliveryFee: 25000, total: 375000,
    paymentStatus: "tasdiqlangan", orderStatus: "kuryerga_berildi", source: "sayt", createdAt: "2026-09-10T18:15:00"
  },
  {
    id: "BN-1031", customerName: "Zarina Ergasheva", phone: "+998 99 777 88 99",
    address: "Olmazor tumani, 9-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p11", name: "Klassik loafer — Oq-kulrang", image: "/products/loafer-white.png", color: "Oq-kulrang", size: "39", qty: 1, price: 350000 }],
    subtotal: 350000, deliveryFee: 25000, total: 375000,
    paymentStatus: "tasdiqlangan", orderStatus: "tayyorlanmoqda", source: "telegram", createdAt: "2026-09-11T09:40:00"
  },
  {
    id: "BN-1032", customerName: "Shahnoza Islomova", phone: "+998 90 888 99 00",
    address: "Yashnobod tumani, 30-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p02", name: "Saten ko'ylak", image: "", color: "Qora", size: "S", qty: 1, price: 420000 }],
    subtotal: 420000, deliveryFee: 25000, total: 445000,
    paymentStatus: "tasdiqlangan", orderStatus: "tayyorlanmoqda", source: "instagram", createdAt: "2026-09-11T13:20:00"
  },
  {
    id: "BN-1033", customerName: "Kamola Sodiqova", phone: "+998 91 999 00 11",
    address: "Uchtepa tumani, 5-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p15", name: "Charm sumka", image: "", color: "Jigarrang", size: "Standart", qty: 1, price: 410000 }],
    subtotal: 410000, deliveryFee: 25000, total: 435000,
    paymentStatus: "tasdiqlangan", orderStatus: "tayyorlanmoqda", source: "instagram", createdAt: "2026-09-12T10:00:00"
  },
  {
    id: "BN-1034", customerName: "Nigora Qodirova", phone: "+998 93 100 11 22",
    address: "Chilonzor tumani, 60-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p03", name: "Trikotaj to'plam", image: "", color: "Oq", size: "L", qty: 1, price: 340000 }],
    subtotal: 340000, deliveryFee: 25000, total: 365000,
    paymentStatus: "tasdiqlangan", orderStatus: "tayyorlanmoqda", source: "instagram", createdAt: "2026-09-13T15:10:00"
  },
  {
    id: "BN-1035", customerName: "Feruza Mirzayeva", phone: "+998 94 211 22 33",
    address: "Mirobod tumani, 14-uy", city: "Toshkent", deliveryType: "olib_ketish",
    items: [{ productId: "p19", name: "Metall taqinchoq to'plami", image: "", color: "Kumush", size: "Standart", qty: 1, price: 190000 }],
    subtotal: 190000, deliveryFee: 0, total: 190000,
    paymentStatus: "tasdiqlangan", orderStatus: "tolov_tasdiqlandi", source: "telegram", createdAt: "2026-09-14T09:30:00"
  },
  {
    id: "BN-1036", customerName: "Sitora Bekova", phone: "+998 97 322 33 44",
    address: "Yakkasaroy tumani, 22-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p04", name: "Klassik jinsi shim", image: "", color: "Ko'k", size: "M", qty: 1, price: 310000 }],
    subtotal: 310000, deliveryFee: 25000, total: 335000,
    paymentStatus: "tasdiqlangan", orderStatus: "tolov_tasdiqlandi", source: "sayt", createdAt: "2026-09-14T17:45:00"
  },
  {
    id: "BN-1037", customerName: "Dilbar Xolova", phone: "+998 99 433 44 55",
    address: "Chilonzor tumani, 88-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p12", name: "Klassik charm tufli", image: "", color: "Qora", size: "37", qty: 1, price: 459000 }],
    subtotal: 459000, deliveryFee: 25000, total: 484000,
    paymentStatus: "kutilmoqda", orderStatus: "tolov_kutilmoqda", source: "instagram", createdAt: "2026-09-16T10:05:00", customerConfirmed: true
  },
  {
    id: "BN-1038", customerName: "Gulchehra Aminova", phone: "+998 90 544 55 66",
    address: "Sergeli tumani, 40-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p13", name: "Bej tufli", image: "", color: "Bej", size: "38", qty: 1, price: 320000 }],
    subtotal: 320000, deliveryFee: 25000, total: 345000,
    paymentStatus: "kutilmoqda", orderStatus: "tolov_kutilmoqda", source: "instagram", createdAt: "2026-09-16T14:00:00", customerConfirmed: true
  },
  {
    id: "BN-1039", customerName: "Ozoda Turdiyeva", phone: "+998 91 655 66 77",
    address: "Bektemir tumani, 16-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p16", name: "Kundalik sumka", image: "", color: "Bej", size: "Standart", qty: 1, price: 230000 }],
    subtotal: 230000, deliveryFee: 25000, total: 255000,
    paymentStatus: "kutilmoqda", orderStatus: "tolov_kutilmoqda", source: "telegram", createdAt: "2026-09-17T09:20:00", customerConfirmed: true
  },
  {
    id: "BN-1040", customerName: "Aziza Yoqubova", phone: "+998 93 766 77 88",
    address: "Olmazor tumani, 27-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p07", name: "Kundalik ko'ylak", image: "", color: "Bej", size: "S", qty: 1, price: 245000 }],
    subtotal: 245000, deliveryFee: 25000, total: 270000,
    paymentStatus: "kutilmoqda", orderStatus: "tolov_kutilmoqda", source: "instagram", createdAt: "2026-09-17T11:40:00", customerConfirmed: true
  },
  {
    id: "BN-1041", customerName: "Munisa G'ofurova", phone: "+998 94 877 88 99",
    address: "Yunusobod tumani, 55-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p18", name: "Kamar", image: "", color: "Qora", size: "S/M", qty: 1, price: 140000 }],
    subtotal: 140000, deliveryFee: 25000, total: 165000,
    paymentStatus: "kutilmoqda", orderStatus: "tolov_kutilmoqda", source: "instagram", createdAt: "2026-09-18T08:50:00", customerConfirmed: true
  },
  {
    id: "BN-1042", customerName: "Lola Saidova", phone: "+998 97 988 99 00",
    address: "Mirzo Ulug'bek tumani, 33-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p05", name: "Yengil kardigan", image: "", color: "Bej", size: "M", qty: 1, price: 275000 }],
    subtotal: 275000, deliveryFee: 25000, total: 300000,
    paymentStatus: "kutilmoqda", orderStatus: "tolov_kutilmoqda", source: "sayt", createdAt: "2026-09-18T13:10:00", customerConfirmed: true
  },
  {
    id: "BN-1043", customerName: "Saodat Ismoilova", phone: "+998 99 100 22 44",
    address: "Chilonzor tumani, 71-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p06", name: "Klassik ko'ylak", image: "", color: "Oq", size: "M", qty: 1, price: 260000 }],
    subtotal: 260000, deliveryFee: 25000, total: 285000,
    paymentStatus: "kutilmoqda", orderStatus: "tolov_kutilmoqda", source: "instagram", createdAt: "2026-09-19T09:00:00", customerConfirmed: true
  },
  {
    id: "BN-1044", customerName: "Yulduz Rashidova", phone: "+998 90 211 33 55",
    address: "Yashnobod tumani, 44-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p09", name: "New Balance 9060 — Pushti", image: "/products/nb9060-pink.png", color: "Pushti", size: "38", qty: 1, price: 420000 }],
    subtotal: 420000, deliveryFee: 25000, total: 445000,
    paymentStatus: "kutilmoqda", orderStatus: "yangi", source: "instagram", createdAt: "2026-09-19T10:30:00"
  },
  {
    id: "BN-1045", customerName: "Dilnoza Karimova", phone: "+998 90 111 22 33",
    address: "Chilonzor tumani, 12-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p14", name: "Mini sumka", image: "", color: "Jigarrang", size: "Standart", qty: 1, price: 279000 }],
    subtotal: 279000, deliveryFee: 25000, total: 304000,
    paymentStatus: "kutilmoqda", orderStatus: "yangi", source: "instagram", createdAt: "2026-09-19T11:05:00"
  },
  {
    id: "BN-1046", customerName: "Nodira Abdullayeva", phone: "+998 93 333 44 55",
    address: "Mirzo Ulug'bek tumani, 7-uy", city: "Toshkent", deliveryType: "olib_ketish",
    items: [{ productId: "p12", name: "Klassik charm tufli", image: "", color: "Qora", size: "39", qty: 1, price: 459000 }],
    subtotal: 459000, deliveryFee: 0, total: 459000,
    paymentStatus: "kutilmoqda", orderStatus: "yangi", source: "telegram", createdAt: "2026-09-19T12:15:00"
  },
  {
    id: "BN-1047", customerName: "Shahnoza Islomova", phone: "+998 90 888 99 00",
    address: "Yashnobod tumani, 30-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p17", name: "Ipak sharf", image: "", color: "Qora naqsh", size: "Standart", qty: 2, price: 165000 }],
    subtotal: 330000, deliveryFee: 25000, total: 355000,
    paymentStatus: "kutilmoqda", orderStatus: "yangi", source: "instagram", createdAt: "2026-09-19T13:40:00"
  },
  {
    id: "BN-1048", customerName: "Nigora Qodirova", phone: "+998 93 100 11 22",
    address: "Chilonzor tumani, 60-uy", city: "Toshkent", deliveryType: "yetkazib_berish",
    items: [{ productId: "p01", name: "Atlas ko'ylak", image: "", color: "Qora", size: "S", qty: 1, price: 389000 }],
    subtotal: 389000, deliveryFee: 25000, total: 414000,
    paymentStatus: "kutilmoqda", orderStatus: "bekor_qilindi", source: "sayt", createdAt: "2026-09-15T16:00:00"
  }
];
