import { Product } from "@/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, title }: { products: Product[]; title?: string }) {
  return (
    <section>
      {title && (
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-[22px] md:text-[28px] text-ink">{title}</h2>
        </div>
      )}
      {products.length === 0 ? (
        <div className="py-20 text-center border border-line">
          <p className="text-inksoft text-sm">Hozircha mahsulot topilmadi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
