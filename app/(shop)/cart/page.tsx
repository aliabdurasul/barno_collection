"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import ProductImage from "@/components/ProductImage";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, products, updateCartQty, removeCartLine, settings } = useApp();

  const lines = cart.map((line, index) => {
    const product = products.find((p) => p.id === line.productId)!;
    return { ...line, index, product };
  });

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee;
  const total = subtotal + deliveryFee;

  if (lines.length === 0) {
    return (
      <div className="container-x py-16 md:py-24 text-center">
        <h1 className="font-display text-[26px] text-ink mb-4">Savat bo&apos;sh</h1>
        <p className="text-inksoft text-sm mb-8">Hozircha savatingizda mahsulot yo&apos;q.</p>
        <Link href="/" className="btn btn-primary">
          Xarid qilishni boshlash
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8 md:py-12">
      <h1 className="font-display text-[26px] md:text-[34px] text-ink mb-8">Savat</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 flex flex-col divide-y divide-line border-t border-b border-line">
          {lines.map((l) => (
            <div key={l.index} className="flex gap-4 py-5">
              <Link href={`/product/${l.product.slug}`} className="w-24 h-32 shrink-0 relative">
                <ProductImage product={l.product} className="w-full h-full" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/product/${l.product.slug}`} className="text-[13.5px] text-ink">
                      {l.product.name}
                    </Link>
                    <p className="text-[12px] text-inksoft mt-1">
                      {l.color} · {l.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeCartLine(l.index)}
                    aria-label="O'chirish"
                    className="text-stone hover:text-danger text-[12px]"
                  >
                    O&apos;chirish
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-line">
                    <button
                      onClick={() => updateCartQty(l.index, l.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center text-ink"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-[13px]">{l.qty}</span>
                    <button
                      onClick={() => updateCartQty(l.index, l.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center text-ink"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[13.5px] text-ink">{formatPrice(l.product.price * l.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="border border-line p-6 sticky top-24">
            <p className="label-eyebrow mb-4">BUYURTMA XULOSASI</p>
            <div className="flex justify-between text-[13px] text-inksoft mb-2.5">
              <span>Ara toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[13px] text-inksoft mb-4">
              <span>Yetkazib berish</span>
              <span>{deliveryFee === 0 ? "Bepul" : formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-[15px] text-ink font-medium pt-4 border-t border-line mb-6">
              <span>Jami</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" className="btn btn-primary w-full">
              Buyurtmani rasmiylashtirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
