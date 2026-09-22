"use client";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import LooksSection from "@/components/LooksSection";
import MonochromeSection from "@/components/MonochromeSection";
import CategorySection from "@/components/CategorySection";
import InstagramSection from "@/components/InstagramSection";
import { useApp } from "@/lib/store";

export default function HomePage() {
  const { products } = useApp();
  const active = products.filter((p) => p.active !== false);

  const newest = active.filter((p) => p.isNew).slice(0, 8);
  const newestIds = new Set(newest.map((p) => p.id));
  const featured = active.filter((p) => !newestIds.has(p.id)).slice(0, 8);

  return (
    <>
      <Hero />

      <div className="container-x py-14 md:py-20">
        <ProductGrid products={newest} title="Yangi kelganlar" />
      </div>

      <LooksSection />

      <MonochromeSection />

      <CategorySection />

      <div className="container-x py-16 md:py-24">
        <ProductGrid products={featured} title="Tanlangan mahsulotlar" />
      </div>

      <InstagramSection />
    </>
  );
}
