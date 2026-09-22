import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  { src: "/catalog/looks/caramel-model.jpg", focal: "50% 20%" },
  { src: "/catalog/looks/olive-flying-scarf.jpg", focal: "50% 15%" },
  { src: "/catalog/looks/beige-sunglasses.jpg", focal: "50% 20%" },
  { src: "/catalog/looks/beige-trench-outfit.jpg", focal: "50% 15%" }
];

const SLIDE_DURATION = 24; // seconds, total loop

export default function Hero() {
  return (
    <section className="relative border-b border-line">
      <div className="relative h-[82vh] md:h-[92vh] min-h-[520px] overflow-hidden bg-ink">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              animation: `heroFade ${SLIDE_DURATION}s ease-in-out infinite`,
              animationDelay: `${(i * SLIDE_DURATION) / SLIDES.length}s`,
              opacity: i === 0 ? 1 : 0
            }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.focal }}
            />
          </div>
        ))}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,24,21,0.05) 0%, rgba(27,24,21,0.0) 35%, rgba(27,24,21,0.55) 100%)"
          }}
        />

        <div className="absolute inset-0 flex items-end">
          <div className="container-x relative pb-12 md:pb-16 w-full">
            <p className="label-eyebrow mb-4" style={{ color: "#E7DFCF" }}>
              YANGI KOLLEKSIYA
            </p>
            <h1 className="font-display italic text-[38px] leading-[1.08] md:text-[74px] text-paper max-w-3xl">
              Har kuni uchun go&apos;zal tanlov.
            </h1>
            <p className="mt-5 text-[14px] md:text-[16px] text-paper/85 max-w-md leading-relaxed">
              Ayollar kiyimi, oyoq kiyim, sumka va aksessuarlar — sizning uslubingiz uchun tanlangan
              kolleksiya.
            </p>
            <Link
              href="/category/yangi-kelganlar"
              className="btn mt-8"
              style={{ background: "#F7F4EE", color: "#1B1815" }}
            >
              Kolleksiyani ko&apos;rish →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
