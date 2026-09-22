"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, products, cartDrawerOpen, closeCartDrawer, updateCartQty, removeCartLine } = useApp();

  const lines = cart.map((line, index) => {
    const product = products.find((p) => p.id === line.productId)!;
    return { ...line, index, product };
  });
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <div
        className="absolute inset-0 bg-ink/40 animate-[fadeIn_0.2s_ease-out]"
        onClick={closeCartDrawer}
      />
      <div className="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-paper flex flex-col shadow-2xl animate-[slideIn_0.28s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-between px-5 py-5 border-b border-line">
          <p className="text-[13px] tracking-wide2 text-ink">SAVAT ({lines.length})</p>
          <button onClick={closeCartDrawer} aria-label="Yopish" className="p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-inksoft text-sm mb-5">Savat bo&apos;sh.</p>
            <button onClick={closeCartDrawer} className="btn btn-outline">
              Xaridni davom ettirish
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 divide-y divide-line">
              {lines.map((l) => (
                <div key={l.index} className="flex gap-3 py-4">
                  <Link href={`/product/${l.product.slug}`} onClick={closeCartDrawer} className="w-16 h-20 shrink-0 relative">
                    <ProductImage product={l.product} className="w-full h-full" />
                  </Link>
                  <div className="flex-1 flex flex-col min-w-0">
                    <Link href={`/product/${l.product.slug}`} onClick={closeCartDrawer} className="text-[12.5px] text-ink truncate">
                      {l.product.name}
                    </Link>
                    <p className="text-[11.5px] text-inksoft mt-0.5">
                      {l.color} · {l.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-line">
                        <button onClick={() => updateCartQty(l.index, l.qty - 1)} className="w-6 h-6 text-[13px] text-ink">
                          −
                        </button>
                        <span className="w-6 text-center text-[12px]">{l.qty}</span>
                        <button onClick={() => updateCartQty(l.index, l.qty + 1)} className="w-6 h-6 text-[13px] text-ink">
                          +
                        </button>
                      </div>
                      <span className="text-[12.5px] text-ink">{formatPrice(l.product.price * l.qty)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCartLine(l.index)}
                    aria-label="O'chirish"
                    className="text-stone hover:text-danger self-start"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="px-5 py-5 border-t border-line">
              <div className="flex justify-between text-[14px] text-ink font-medium mb-4">
                <span>Jami</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link href="/cart" onClick={closeCartDrawer} className="btn btn-outline w-full mb-2">
                Savatga o&apos;tish
              </Link>
              <Link href="/checkout" onClick={closeCartDrawer} className="btn btn-primary w-full">
                Buyurtma berish →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
