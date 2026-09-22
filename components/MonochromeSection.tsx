import Image from "next/image";
import Link from "next/link";

export default function MonochromeSection() {
  return (
    <section className="border-t border-line">
      <div className="relative h-[70vh] md:h-[86vh] min-h-[440px] overflow-hidden bg-ink">
        <Image
          src="/catalog/looks/brown-couch.jpg"
          alt="Monochrome outfit"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 12%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(27,24,21,0.55) 0%, rgba(27,24,21,0.1) 45%, rgba(27,24,21,0) 100%)"
          }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container-x">
            <div className="max-w-xs md:max-w-sm">
              <p className="label-eyebrow mb-4" style={{ color: "#E7DFCF" }}>
                MONOCHROME OUTFIT
              </p>
              <h2 className="font-display italic text-[30px] md:text-[42px] text-paper leading-tight mb-4">
                Bir ohang. Cheksiz nafislik.
              </h2>
              <p className="text-paper/80 text-[13.5px] leading-relaxed mb-6">
                Bir xil rang gammasida yig&apos;ilgan obraz — ortiqcha detalarsiz, sof uslub.
              </p>
              <Link
                href="/category/ayollar-kiyimi"
                className="text-[12px] tracking-wide2 text-paper border-b border-paper/60 pb-1"
              >
                KOLLEKSIYANI KO&apos;RISH →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
