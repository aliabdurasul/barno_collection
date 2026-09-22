"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { categories } from "@/data/categories";
import { formatPrice, totalStock } from "@/lib/utils";
import { CategorySlug, Product } from "@/types";

const PRODUCT_CATEGORIES = categories.filter(
  (c) => c.slug !== "yangi-kelganlar" && c.slug !== "chegirmalar"
);

const EMPTY_FORM = {
  name: "",
  category: "ayollar-kiyimi" as Exclude<CategorySlug, "yangi-kelganlar" | "chegirmalar">,
  price: "",
  oldPrice: "",
  description: "",
  colors: "Qora, Bej",
  sizes: "XS, S, M, L, XL",
  stockPerSize: "5",
  isNew: false,
  isDiscounted: false,
  active: true,
  placeholderTone: "#E7DED0"
};

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function resetAndClose() {
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    const sizes = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const colors = form.colors.split(",").map((s) => s.trim()).filter(Boolean);
    const qty = Number(form.stockPerSize) || 0;
    const stock: Record<string, number> = {};
    sizes.forEach((s) => (stock[s] = qty));

    const slug =
      form.name
        .toLowerCase()
        .replace(/['’"]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") + "-" + Math.floor(Math.random() * 1000);

    const product: Product = {
      id: "p" + Date.now(),
      name: form.name.trim(),
      slug,
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      description: form.description.trim() || "Tavsif hali qo'shilmagan.",
      details: [],
      image: "",
      imageType: "placeholder",
      placeholderTone: form.placeholderTone,
      colors: colors.length ? colors : ["Standart"],
      sizes: sizes.length ? sizes : ["Standart"],
      stock,
      isNew: form.isNew,
      isDiscounted: form.isDiscounted,
      weeklySales: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      active: form.active
    };
    addProduct(product);
    resetAndClose();
  }

  return (
    <div className="p-5 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="label-eyebrow mb-1">MAHSULOTLAR</p>
          <h1 className="font-display text-[26px] md:text-[32px] text-ink">Mahsulotlarni boshqarish</h1>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn btn-primary">
          {showForm ? "Bekor qilish" : "Yangi mahsulot"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-line p-5 md:p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">MAHSULOT NOMI</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" required />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">KATEGORIYA</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as any })}
              className="input"
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">RANG (vergul bilan)</label>
            <input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">NARX (so&apos;m)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" required />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">ESKI NARX (ixtiyoriy)</label>
            <input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">O&apos;LCHAMLAR (vergul bilan)</label>
            <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">HAR BIR O&apos;LCHAM UCHUN ZAXIRA</label>
            <input type="number" value={form.stockPerSize} onChange={(e) => setForm({ ...form, stockPerSize: e.target.value })} className="input" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">TAVSIF</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input" />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-[13px] text-inksoft">
              <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} />
              Yangi mahsulot
            </label>
            <label className="flex items-center gap-2 text-[13px] text-inksoft">
              <input type="checkbox" checked={form.isDiscounted} onChange={(e) => setForm({ ...form, isDiscounted: e.target.checked })} />
              Chegirma
            </label>
            <label className="flex items-center gap-2 text-[13px] text-inksoft">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Faol
            </label>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn btn-primary">
              Saqlash
            </button>
          </div>
        </form>
      )}

      <div className="border border-line overflow-x-auto">
        <table className="admin-table min-w-[760px]">
          <thead>
            <tr>
              <th>Mahsulot</th>
              <th>Kategoriya</th>
              <th>Narx</th>
              <th>Zaxira</th>
              <th>Holat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="text-ink">
                  {p.name}
                  <div className="flex gap-1 mt-1">
                    {p.isNew && <span className="text-[10px] px-1.5 py-0.5 bg-ink text-paper">YANGI</span>}
                    {p.isDiscounted && <span className="text-[10px] px-1.5 py-0.5 bg-danger text-paper">CHEGIRMA</span>}
                  </div>
                </td>
                <td>{categories.find((c) => c.slug === p.category)?.name}</td>
                <td>{formatPrice(p.price)}</td>
                <td>{totalStock(p.stock)} dona</td>
                <td>
                  <button
                    onClick={() => updateProduct(p.id, { active: p.active === false })}
                    className={`text-[11px] px-2 py-1 ${p.active === false ? "bg-paper2 text-inksoft" : "bg-[#DDEADD] text-success"}`}
                  >
                    {p.active === false ? "Nofaol" : "Faol"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      if (confirm(`${p.name} o'chirilsinmi?`)) deleteProduct(p.id);
                    }}
                    className="text-[12px] text-danger underline"
                  >
                    O&apos;chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
