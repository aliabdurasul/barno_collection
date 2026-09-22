"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import { categories } from "@/data/categories";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { products } = useApp();
  const category = categories.find((c) => c.slug === params.slug);
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");
  const [color, setColor] = useState<string>("Barchasi");

  if (!category) return notFound();

  const base = useMemo(() => {
    const active = products.filter((p) => p.active !== false);
    if (category.slug === "yangi-kelganlar") return active.filter((p) => p.isNew);
    if (category.slug === "chegirmalar") return active.filter((p) => p.isDiscounted);
    return active.filter((p) => p.category === category.slug);
  }, [products, category]);

  const colors = useMemo(() => {
    const set = new Set<string>();
    base.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return ["Barchasi", ...Array.from(set)];
  }, [base]);

  let list = color === "Barchasi" ? base : base.filter((p) => p.colors.includes(color));
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <div className="container-x py-8 md:py-12">
      <p className="label-eyebrow mb-2">{list.length} ta mahsulot</p>
      <h1 className="font-display text-[28px] md:text-[38px] text-ink mb-6">{category.name}</h1>

      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-line">
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="input w-auto text-[12px] py-2 px-3"
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c === "Barchasi" ? "Rang: Barchasi" : `Rang: ${c}`}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="input w-auto text-[12px] py-2 px-3"
        >
          <option value="default">Saralash: Standart</option>
          <option value="price-asc">Narx: Arzondan qimmatga</option>
          <option value="price-desc">Narx: Qimmatdan arzonga</option>
        </select>
      </div>

      <ProductGrid products={list} />
    </div>
  );
}
