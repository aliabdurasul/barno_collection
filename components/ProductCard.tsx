"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, totalStock } from "@/lib/utils";
import ProductImage from "./ProductImage";
import { useApp } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useApp();
  const inWishlist = wishlist.includes(product.id);
  const stock = totalStock(product.stock);

  return (
    <div className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4]">
          <ProductImage product={product} className="w-full h-full" hoverSwap />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-ink text-paper text-[10px] tracking-wide2 px-2 py-1">YANGI</span>
            )}
            {product.isDiscounted && (
              <span className="bg-danger text-paper text-[10px] tracking-wide2 px-2 py-1">CHEGIRMA</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label="Sevimlilarga qo'shish"
            className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-paper/90 backdrop-blur-sm transition-transform duration-150 active:scale-90"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={inWishlist ? "#1B1815" : "none"}
              stroke="#1B1815"
              strokeWidth="1.5"
              className={`transition-transform duration-200 ${inWishlist ? "scale-110" : "scale-100"}`}
            >
              <path d="M12 21s-7.5-4.6-10-9.1C0.3 8.3 2 4.5 5.6 4.1c2-.2 3.7.9 4.9 2.6C11.7 5 13.4 3.9 15.4 4.1c3.6.4 5.3 4.2 3.6 7.8C19.5 16.4 12 21 12 21z" />
            </svg>
          </button>
          {stock > 0 && stock <= 3 && (
            <span className="absolute bottom-2.5 left-2.5 bg-paper/95 text-inksoft text-[10px] tracking-wide2 px-2 py-1">
              {stock} dona qoldi
            </span>
          )}
          {stock === 0 && (
            <div className="absolute inset-0 bg-paper/70 flex items-center justify-center">
              <span className="text-[11px] tracking-wide2 text-inksoft border border-ink/30 px-3 py-1.5 bg-paper">
                TUGAGAN
              </span>
            </div>
          )}
        </div>
        <div className="pt-3 pb-1">
          <h3 className="text-[13px] text-ink leading-snug">{product.name}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[13px] text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[12px] text-stone line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
