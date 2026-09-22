"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";

export default function ProductGallery({ product }: { product: Product }) {
  const media: { type: "image" | "video"; src: string }[] = [];
  if (product.imageType === "photo") {
    const imgs = product.images && product.images.length > 0 ? product.images : [product.image];
    imgs.forEach((src) => media.push({ type: "image", src }));
    if (product.video) media.push({ type: "video", src: product.video });
  }

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (media.length === 0) {
    // placeholder fallback
    return (
      <div className="relative aspect-[3/4]">
        <div
          className="w-full h-full flex items-end justify-center"
          style={{
            background: `linear-gradient(175deg, ${product.placeholderTone ?? "#E7DED0"} 0%, ${
              product.placeholderTone ?? "#E7DED0"
            } 60%, #00000012 100%)`
          }}
        >
          <span className="pb-6 font-display italic text-[15px] text-ink/70">{product.name}</span>
        </div>
      </div>
    );
  }

  const current = media[active];

  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {/* Main viewer */}
        <div className="relative aspect-[3/4] bg-paper2 overflow-hidden">
          {current.type === "image" ? (
            <button
              type="button"
              onClick={() => setZoom(true)}
              className="absolute inset-0 cursor-zoom-in"
              aria-label="Kattalashtirish"
            >
              <Image
                src={current.src}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </button>
          ) : (
            <video
              src={current.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Thumbnails */}
        {media.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {media.map((m, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative w-16 h-20 shrink-0 border overflow-hidden ${
                  i === active ? "border-ink" : "border-line"
                }`}
              >
                {m.type === "image" ? (
                  <Image src={m.src} alt="" fill sizes="64px" className="object-cover" />
                ) : (
                  <video src={m.src} muted className="w-full h-full object-cover" />
                )}
                {m.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F7F4EE">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {zoom && current.type === "image" && (
        <div
          className="fixed inset-0 z-[100] bg-ink/90 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <button
            aria-label="Yopish"
            className="absolute top-5 right-5 text-paper"
            onClick={() => setZoom(false)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <div className="relative w-full h-full max-w-3xl">
            <Image src={current.src} alt={product.name} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
