"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useApp } from "@/lib/store";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import { formatPrice } from "@/lib/utils";

const ACCORDIONS = [
  { key: "size", title: "O'lcham va mos kelishi" },
  { key: "care", title: "Tarkibi va parvarish" },
  { key: "delivery", title: "Yetkazib berish va qaytarish" }
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { products, addToCart, wishlist, toggleWishlist } = useApp();
  const router = useRouter();
  const product = products.find((p) => p.slug === params.slug);

  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [size, setSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [products, product]);

  if (!product) return notFound();

  const stockForSize = size ? product.stock[size] ?? 0 : null;
  const inWishlist = wishlist.includes(product.id);

  function handleAdd(goToCheckout: boolean) {
    if (!size) {
      setError("Iltimos, o'lchamni tanlang.");
      return;
    }
    if ((product!.stock[size] ?? 0) <= 0) {
      setError("Bu o'lcham tugagan.");
      return;
    }
    setError(null);
    addToCart({ productId: product!.id, color, size, qty: 1 });
    if (goToCheckout) router.push("/cart");
  }

  return (
    <div className="container-x py-6 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="grid grid-cols-1 gap-2">
          <ProductGallery product={product} />
        </div>

        <div className="md:pt-4 max-w-md">
          {product.isNew && <p className="label-eyebrow mb-2">YANGI</p>}
          <h1 className="font-display text-[26px] md:text-[32px] text-ink leading-tight">{product.name}</h1>
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-[17px] text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[14px] text-stone line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <p className="text-[13.5px] text-inksoft leading-relaxed mt-5">{product.description}</p>

          <div className="mt-7">
            <p className="text-[12px] tracking-wide2 text-ink mb-2.5">RANG: {color}</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3.5 py-2 text-[12px] border ${
                    c === color ? "border-ink bg-ink text-paper" : "border-line text-inksoft"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[12px] tracking-wide2 text-ink">O&apos;LCHAM</p>
              {stockForSize !== null && (
                <span className="text-[11.5px] text-inksoft">
                  {stockForSize > 0
                    ? stockForSize <= 3
                      ? `Faqat ${stockForSize} dona qoldi`
                      : "Mavjud"
                    : "Tugagan"}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const qty = product.stock[s] ?? 0;
                const disabled = qty <= 0;
                return (
                  <button
                    key={s}
                    disabled={disabled}
                    onClick={() => {
                      setSize(s);
                      setError(null);
                    }}
                    className={`min-w-[46px] h-11 px-2 text-[13px] border transition-colors ${
                      disabled
                        ? "border-line text-stone line-through cursor-not-allowed"
                        : s === size
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {error && <p className="text-[12px] text-danger mt-2">{error}</p>}
          </div>

          <div className="flex gap-3 mt-7">
            <button onClick={() => handleAdd(false)} className="btn btn-outline flex-1">
              Savatga qo&apos;shish
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Sevimlilarga qo'shish"
              className="w-12 h-[46px] flex items-center justify-center border border-line"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "#1B1815" : "none"} stroke="#1B1815" strokeWidth="1.5">
                <path d="M12 21s-7.5-4.6-10-9.1C0.3 8.3 2 4.5 5.6 4.1c2-.2 3.7.9 4.9 2.6C11.7 5 13.4 3.9 15.4 4.1c3.6.4 5.3 4.2 3.6 7.8C19.5 16.4 12 21 12 21z" />
              </svg>
            </button>
          </div>
          <button onClick={() => handleAdd(true)} className="btn btn-primary w-full mt-3">
            Hoziroq xarid qilish
          </button>

          <div className="mt-10 border-t border-line">
            {ACCORDIONS.map((a) => (
              <div key={a.key} className="border-b border-line">
                <button
                  onClick={() => setOpenAccordion(openAccordion === a.key ? null : a.key)}
                  className="w-full flex items-center justify-between py-4 text-left text-[13px] text-ink"
                >
                  {a.title}
                  <span className="text-lg leading-none">{openAccordion === a.key ? "–" : "+"}</span>
                </button>
                {openAccordion === a.key && (
                  <div className="pb-4 text-[12.5px] text-inksoft leading-relaxed">
                    {a.key === "size" && "O'lcham jadvali brendga qarab farq qilishi mumkin. Aniq o'lcham uchun admin bilan bog'laning."}
                    {a.key === "care" && (
                      <ul className="list-disc pl-4 space-y-1">
                        {product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                    {a.key === "delivery" && "Toshkent bo'ylab 1-2 kun ichida yetkazib beriladi. Viloyatlarga yetkazib berish muddati kelishiladi."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 md:mt-28">
          <ProductGrid products={related} title="O'xshash mahsulotlar" />
        </div>
      )}
    </div>
  );
}
