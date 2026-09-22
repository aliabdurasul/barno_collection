# BARNO — Fashion Sales & Order Management Platform (Demo)

Özbekistan'daki kadın giyim/ayoq kiyim/sumka/aksessuar işletmesi için hazırlanmış,
uçtan uca çalışan online satış + sipariş yönetim + stok + satış analitiği demo platformu.

Tamamen mock data ile çalışır — Supabase veya başka bir backend zorunlu değildir.

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` açılır.

## Vercel'e deploy

1. Bu klasörü bir GitHub reposuna push edin (ya da Vercel CLI ile doğrudan deploy edin: `npx vercel`).
2. [vercel.com/new](https://vercel.com/new) üzerinden repoyu import edin.
3. Framework preset otomatik olarak **Next.js** algılanır, ek ayar gerekmez.
4. Deploy'a basın — build komutu `next build`, hiçbir environment variable zorunlu değildir.

> Not: Bu ortamda (kod üretim sandboxı) internet erişimi kapalı olduğu için `npm install` ve
> `next build` buradan çalıştırılıp doğrulanamadı. Kod dikkatle, standart Next.js 14 App Router
> pattern'lerine uygun yazıldı; ilk build'de küçük bir TypeScript hatasıyla karşılaşırsanız
> ilgili dosyayı bana gösterin, birlikte düzeltelim.

## Demo akışı (uçtan uca test)

**Müşteri tarafı:**
1. Ana sahifa (`/`) → kategoriya tanlang (masalan `Oyoq kiyim`)
2. Mahsulot ustiga bosing → rang va o'lcham tanlang → **"Savatga qo'shish"** yoki **"Hoziroq xarid qilish"**
3. `/cart` → **"Buyurtmani rasmiylashtirish"**
4. Checkout formani to'ldiring → **"Buyurtma berish"**
5. QR to'lov sahifasida summani ko'ring → **"To'lov qildim"**
6. Buyurtma kuzatuv sahifasiga (`/orders/[id]`) yo'naltirilasiz — holat "To'lov tasdiqlash kutilmoqda"

**Admin tarafı:**
1. Footer'dagi **"Admin panelini ko'rish"** havolasi orqali yoki to'g'ridan-to'g'ri `/admin`
2. `/admin/orders` — yangi buyurtmani toping, ichiga kiring
3. **"To'lovni tasdiqlash"** tugmasini bosing → stok avtomatik kamayadi, holat yangilanadi
4. `/admin/inventory` — zaxira o'zgarganini ko'ring
5. `/admin` (dashboard) — savdo dinamikasi, tez/sekin sotiladigan mahsulotlar, o'lcham/rang/kanal analitikasi
6. `/admin/products`, `/admin/customers`, `/admin/reports`, `/admin/settings` — qolgan boshqaruv sahifalari

## Arxitektura

```
app/
  (shop)/          → mijoz saytining barcha sahifalari (Header + Footer + mobile bottom nav bilan)
    page.tsx        → bosh sahifa
    category/[slug] → kategoriya ro'yxati
    product/[slug]  → mahsulot detali
    cart/           → savat
    checkout/       → buyurtma formasi + to'lov simulyatsiyasi
    orders/[id]     → buyurtma kuzatuvi
    search/, wishlist/
  admin/            → admin panel (alohida sidebar layout bilan)
    page.tsx        → dashboard
    orders/, inventory/, products/, customers/, reports/, settings/
components/         → qayta ishlatiladigan UI komponentlari
data/                → mock data (mahsulotlar, buyurtmalar, mijozlar, dashboard raqamlari)
lib/
  store.tsx          → global client-side state (savat, sevimlilar, buyurtmalar, mahsulotlar,
                        sozlamalar) — React Context + localStorage orqali saqlanadi
  utils.ts           → narx formatlash, sana formatlash va h.k.
types/               → TypeScript interfeyslar
public/products/     → yuklab berilgan haqiqiy mahsulot fotolari (NB 9060, loaferlar)
```

## Supabase'ga o'tish (keyingi bosqich)

Hozirgi holatda barcha ma'lumotlar `data/*.ts` fayllaridagi mock arraylarda va
`lib/store.tsx` ichidagi React Context'da (localStorage bilan persist qilingan) saqlanadi.

Supabase'ga o'tish uchun:
1. `lib/store.tsx` ichidagi `setProducts`/`setOrders` kabi funksiyalarni Supabase
   `insert`/`update`/`select` chaqiruvlariga almashtiring.
2. `data/*.ts` fayllaridagi statik arraylarni boshlang'ich seed sifatida Supabase
   jadvallariga import qiling (`products`, `orders`, `customers`, `order_items`).
3. `types/index.ts` dagi interfeyslar Supabase jadval sxemalari bilan deyarli bir xil
   bo'lgani uchun katta o'zgarish talab qilinmaydi.

## Muhim eslatmalar

- Barcha UI matni O'zbek tilida (lotin alifbosi), spesifikatsiyada berilgan atamalarga mos.
- 4 ta mahsulot (`New Balance 9060 — Shokolad/Pushti`, `Klassik loafer — Jigarrang/Oq-kulrang`)
  siz yuborgan haqiqiy fotolardan foydalanadi (`public/products/` papkasida).
- Qolgan mahsulotlar uchun haqiqiy foto berilmagani sababli, "fashion editorial" uslubidagi
  nafis rangli placeholder kartalar ishlatildi — keyinchalik `data/products.ts` dagi
  `image` maydoniga haqiqiy foto yo'lini qo'yish yetarli (`imageType: "photo"` qiling).
- Stok modeli soddalashtirilgan: har bir mahsulot rang bo'yicha emas, faqat o'lcham
  bo'yicha zaxiraga ega (`stock: Record<size, qty>`). Real loyihada rang×o'lcham
  kombinatsiyasi kerak bo'lsa, bu struktura kengaytirilishi kerak.

## v2 — Premium storefront redesign (2026-09-20)

Mijoz tomoni (`(shop)`) to'liq premium fashion-boutique uslubida qayta ishlandi. Admin panelga,
header ikonlariga va checkout/payment mantig'iga tegilmadi.

**Yangi bo'limlar:**
- Ko'p slaydli, sekin fade bo'ladigan editorial hero (`components/Hero.tsx`)
- OBRAZY / look bo'limi — tayyor uslublar, `/look/[id]` sahifasi bilan (`data/looks.ts`)
- MONOCHROME OUTFIT — yagona kuchli editorial banner
- Rasmli, editorial kategoriya kartalari (oldingi oddiy matnli kataklar o'rniga)
- Instagram/brend bo'limi — haqiqiy havola bilan (`https://instagram.com/barno_obuv`)
- Mini-cart drawer — mahsulot savatga qo'shilganda ochiladi
- Ko'p rasmli va videoli mahsulot galereyasi (`components/ProductGallery.tsx`)
- Product card hover'da ikkinchi rasmga o'tish effekti

**Mahsulot fotolari:** foydalanuvchi yuborgan professional katalog fotolaridan (PDF orqali)
tanlab olindi va `public/catalog/{abayas,pants,shoes,bags,looks}/` papkalariga joylashtirildi.
Barcha mahsulot ma'lumotlari (`data/products.ts`) shu haqiqiy fotolarga mos yangilandi — endi
katalog asosan abaya, keng shim va poyabzal assortimentidan iborat (foydalanuvchi bergan real
fotolarga mos ravishda).

Foydalanuvchi bergan "FOTO 26/50/51/63/69/80/96" raqamli eslatmalar aniq fayl-nomerlash tizimiga
mos kelmagani sababli (PDF sahifalari 72 tadan oshmaydi), rasm-bo'lim moslashuvi tarkib/mazmun
bo'yicha qo'lda amalga oshirildi:
- HERO → karamel abaya, dramatik hijob fotosi
- CATEGORY → har bir kategoriyaga oid eng kuchli editorial foto
- MONOCHROME OUTFIT → divan oldida turgan jigarrang abaya fotosi
- OBRAZY → 4 ta uslub kolleyji/fotosi
- Poyabzal, abaya va shim mahsulotlari — mos studiya fotolari bilan

Agar aniq raqamlangan fotolar boshqacha joylashishi kerak bo'lsa, qaysi fotoni qayerga
qo'yish kerakligini aniq tasvirlab bering — moslashtirib beraman.
