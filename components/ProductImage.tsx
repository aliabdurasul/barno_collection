import Image from "next/image";
import { Product } from "@/types";

export default function ProductImage({
  product,
  className = "",
  priority = false,
  hoverSwap = false
}: {
  product: Pick<Product, "image" | "images" | "imageType" | "placeholderTone" | "name">;
  className?: string;
  priority?: boolean;
  hoverSwap?: boolean;
}) {
  if (product.imageType === "photo" && product.image) {
    const secondImage = product.images && product.images.length > 1 ? product.images[1] : null;
    return (
      <div className={`relative overflow-hidden bg-paper2 ${className}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-all duration-500 ease-out ${
            hoverSwap ? "group-hover:scale-[1.045]" : ""
          } ${hoverSwap && secondImage ? "group-hover:opacity-0" : ""}`}
        />
        {hoverSwap && secondImage && (
          <Image
            src={secondImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 scale-[1.045] transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}
      </div>
    );
  }

  const tone = product.placeholderTone ?? "#E7DED0";
  return (
    <div
      className={`relative overflow-hidden flex items-end justify-center ${className}`}
      style={{
        background: `linear-gradient(175deg, ${tone} 0%, ${tone} 60%, #00000012 100%)`
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #1B1815 0px, #1B1815 1px, transparent 1px, transparent 14px)"
        }}
      />
      <span className="relative pb-5 font-display italic text-[13px] tracking-wide text-ink/70 text-center px-4">
        {product.name}
      </span>
    </div>
  );
}
