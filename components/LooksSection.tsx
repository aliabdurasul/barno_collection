import Image from "next/image";
import Link from "next/link";
import { looks } from "@/data/looks";

export default function LooksSection() {
  return (
    <section className="border-t border-line bg-paper2/40">
      <div className="container-x py-16 md:py-24">
        <div className="mb-10 md:mb-14 max-w-lg">
          <p className="label-eyebrow mb-3">OBRAZY</p>
          <h2 className="font-display text-[28px] md:text-[38px] text-ink leading-tight">
            Mahsulotdan ko&apos;ra ko&apos;proq — uslub.
          </h2>
          <p className="text-[13.5px] text-inksoft mt-3 leading-relaxed">
            Har bir obraz — bir necha mahsulotdan yig&apos;ilgan tayyor uslub. Yoqqan look ustiga bosing va
            undagi mahsulotlarni ko&apos;ring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {looks.map((look, i) => (
            <Link
              key={look.id}
              href={`/look/${look.id}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-paper2">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: "50% 18%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 55%, rgba(27,24,21,0.65) 100%)"
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-paper font-display italic text-[18px]">{look.title}</p>
                  <p className="text-paper/80 text-[11.5px] mt-1 leading-snug">{look.subtitle}</p>
                  <span className="inline-block mt-2 text-[11px] tracking-wide2 text-paper/90 border-b border-paper/50 group-hover:border-paper transition-colors">
                    Look&apos;ni kashf qilish →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
