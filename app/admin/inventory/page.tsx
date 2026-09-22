"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/lib/store";
import { categories } from "@/data/categories";
import { stockLabel } from "@/lib/utils";

interface Row {
  productId: string;
  name: string;
  category: string;
  colors: string;
  size: string;
  stock: number;
  weeklySales: number;
}

function InventoryInner() {
  const { products } = useApp();
  const params = useSearchParams();
  const initialQuick = params.get("filter") === "kam" ? "kam" : params.get("filter") === "tugagan" ? "tugagan" : "hammasi";
  const [category, setCategory] = useState("Barchasi");
  const [quick, setQuick] = useState<"hammasi" | "kam" | "tugagan">(initialQuick as any);

  const rows: Row[] = useMemo(() => {
    const out: Row[] = [];
    products.forEach((p) => {
      const catName = categories.find((c) => c.slug === p.category)?.name ?? p.category;
      Object.entries(p.stock).forEach(([size, qty]) => {
        out.push({
          productId: p.id,
          name: p.name,
          category: catName,
          colors: p.colors.join(", "),
          size,
          stock: qty,
          weeklySales: p.weeklySales
        });
      });
    });
    return out;
  }, [products]);

  const categoryNames = ["Barchasi", ...Array.from(new Set(rows.map((r) => r.category)))];

  let filtered = category === "Barchasi" ? rows : rows.filter((r) => r.category === category);
  if (quick === "kam") filtered = filtered.filter((r) => r.stock > 0 && r.stock <= 3);
  if (quick === "tugagan") filtered = filtered.filter((r) => r.stock === 0);

  return (
    <div className="p-5 md:p-10">
      <p className="label-eyebrow mb-1">OMBOR</p>
      <h1 className="font-display text-[26px] md:text-[32px] text-ink mb-6">Ombor holati</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input w-auto text-[12px] py-2 px-3">
          {categoryNames.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {(["hammasi", "kam", "tugagan"] as const).map((q) => (
          <button
            key={q}
            onClick={() => setQuick(q)}
            className={`px-3 py-2 text-[12px] border ${quick === q ? "border-ink bg-ink text-paper" : "border-line text-inksoft"}`}
          >
            {q === "hammasi" ? "Barchasi" : q === "kam" ? "Kam qoldi" : "Tugagan"}
          </button>
        ))}
      </div>

      <div className="border border-line overflow-x-auto">
        <table className="admin-table min-w-[720px]">
          <thead>
            <tr>
              <th>Mahsulot</th>
              <th>Kategoriya</th>
              <th>Rang</th>
              <th>O&apos;lcham</th>
              <th>Zaxira</th>
              <th>7 kunlik sotuv</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={`${r.productId}-${r.size}-${i}`}>
                <td className="text-ink">{r.name}</td>
                <td>{r.category}</td>
                <td>{r.colors}</td>
                <td>{r.size}</td>
                <td>{r.stock}</td>
                <td>{r.weeklySales}</td>
                <td>
                  <span
                    className={
                      r.stock === 0 ? "text-danger" : r.stock <= 3 ? "text-warn" : "text-success"
                    }
                  >
                    {stockLabel(r.stock)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-inksoft text-sm py-10">Natija topilmadi.</p>}
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={null}>
      <InventoryInner />
    </Suspense>
  );
}
