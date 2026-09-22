"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { looks } from "@/data/looks";
import { useApp } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";

export default function LookPage({ params }: { params: { id: string } }) {
  const { products } = useApp();
  const look = looks.find((l) => l.id === params.id);
  if (!look) return notFound();

  const shopProducts = products.filter((p) => look.productSlugs.includes(p.slug));

  return (
    <div>
      <div className="relative h-[62vh] md:h-[78vh] min-h-[420px]">
        <Image
          src={look.image}
          alt={look.title}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 15%" }}
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 55%, rgba(27,24,21,0.6) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 container-x pb-10">
          <p className="label-eyebrow mb-2" style={{ color: "#E7DFCF" }}>
            OBRAZ
          </p>
          <h1 className="font-display italic text-[32px] md:text-[48px] text-paper">{look.title}</h1>
          <p className="text-paper/85 text-[13.5px] mt-2 max-w-md">{look.subtitle}</p>
        </div>
      </div>

      <div className="container-x py-12 md:py-16">
        <ProductGrid products={shopProducts} title="Ushbu obrazdagi mahsulotlar" />
      </div>
    </div>
  );
}
