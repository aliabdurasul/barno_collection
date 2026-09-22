"use client";

import { useApp } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export default function WishlistPage() {
  const { products, wishlist } = useApp();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-x py-8 md:py-12">
      <h1 className="font-display text-[26px] md:text-[34px] text-ink mb-6">Sevimlilar</h1>
      {items.length === 0 ? (
        <div className="py-20 text-center border border-line">
          <p className="text-inksoft text-sm mb-4">Sevimlilar ro&apos;yxati hozircha bo&apos;sh.</p>
          <Link href="/" className="btn btn-outline">
            Xarid qilishni boshlash
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
