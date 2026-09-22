import Image from "next/image";
import Link from "next/link";
import { navCategories } from "@/data/categories";

const CATEGORY_MEDIA: Record<string, { image: string; description: string; focal?: string }> = {
  "yangi-kelganlar": {
    image: "/catalog/looks/brown-couch.jpg",
    description: "Bu hafta qo'shilgan tanlangan yangiliklar.",
    focal: "50% 15%"
  },
  "ayollar-kiyimi": {
    image: "/catalog/abayas/aubergine-beaded.jpg",
    description: "Yangi mavsumning tanlangan modellari.",
    focal: "50% 12%"
  },
  "oyoq-kiyim": {
    image: "/catalog/shoes/nb9060-brown.jpg",
    description: "Har kuniga mos, premium poyabzal.",
    focal: "50% 40%"
  },
  sumka: {
    image: "/catalog/bags/tote-burgundy.jpg",
    description: "Kundalik va kechki tadbirlar uchun sumkalar.",
    focal: "50% 30%"
  },
  aksessuarlar: {
    image: "/catalog/looks/luxury-collection.jpg",
    description: "Uslubingizga yakuniy urg'u.",
    focal: "50% 18%"
  }
};

export default function CategorySection() {
  const items = navCategories
    .filter((c) => CATEGORY_MEDIA[c.slug])
    .map((c) => ({ ...c, ...CATEGORY_MEDIA[c.slug] }));

  return (
    <section className="border-t border-line">
      <div className="container-x py-16 md:py-24">
        <p className="label-eyebrow mb-3">KATEGORIYALAR</p>
        <h2 className="font-display text-[28px] md:text-[38px] text-ink mb-10 md:mb-14 max-w-lg">
          O&apos;z uslubingizni tanlang.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {/* First tile large, editorial */}
          <Link
            href={`/category/${items[0].slug}`}
            className="group relative md:col-span-3 aspect-[4/5] md:aspect-auto overflow-hidden block"
          >
            <Image
              src={items[0].image}
              alt={items[0].name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: items[0].focal ?? "50% 20%" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 50%, rgba(27,24,21,0.6) 100%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-paper font-display text-[24px] md:text-[28px] tracking-wide">
                {items[0].name.toUpperCase()}
              </h3>
              <p className="text-paper/85 text-[12.5px] mt-1">{items[0].description}</p>
              <span className="inline-block mt-3 text-[11px] tracking-wide2 text-paper border-b border-paper/60">
                Ko&apos;rish →
              </span>
            </div>
          </Link>

          <div className="md:col-span-3 grid grid-cols-2 gap-4 md:gap-5">
            {items.slice(1).map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="group relative aspect-[4/5] overflow-hidden block">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: c.focal ?? "50% 20%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 55%, rgba(27,24,21,0.6) 100%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <h3 className="text-paper font-display text-[15px] tracking-wide">{c.name.toUpperCase()}</h3>
                  <span className="inline-block mt-1.5 text-[10px] tracking-wide2 text-paper/90">Ko&apos;rish →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
