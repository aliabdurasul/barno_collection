"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";

function SearchInner() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const { products } = useApp();
  const [q, setQ] = useState(initial);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const query = q.trim().toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(query));
  }, [q, products]);

  return (
    <div className="container-x py-8 md:py-12">
      <h1 className="font-display text-[26px] md:text-[34px] text-ink mb-6">Qidirish</h1>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Mahsulot nomini kiriting..."
        className="input mb-10 max-w-md"
      />
      {q.trim() ? (
        <ProductGrid products={results} title={`"${q}" bo'yicha natijalar`} />
      ) : (
        <p className="text-inksoft text-sm">Qidirish uchun mahsulot nomini yozing.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchInner />
    </Suspense>
  );
}
