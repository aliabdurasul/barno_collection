"use client";

import Image from "next/image";
import { useApp } from "@/lib/store";

const GALLERY = [
  "/catalog/looks/collage-pink-coat.jpg",
  "/catalog/looks/collage-purple.jpg",
  "/catalog/looks/two-women-sitting.jpg",
  "/catalog/looks/luxury-collection.jpg",
  "/catalog/looks/sage-back.jpg",
  "/catalog/looks/blush-side.jpg"
];

export default function InstagramSection() {
  const { settings } = useApp();
  const instaHref = `https://${settings.instagram.replace(/^https?:\/\//, "")}`;

  return (
    <section className="border-t border-line">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <p className="label-eyebrow mb-3">INSTAGRAMDA BARNO</p>
            <h2 className="font-display text-[26px] md:text-[34px] text-ink">
              Yangi kolleksiyalar va kundalik look&apos;lar.
            </h2>
          </div>
          <a
            href={instaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink border-b border-ink/40 hover:border-ink pb-0.5 w-fit"
          >
            @barno_obuv →
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {GALLERY.map((src) => (
            <a
              key={src}
              href={instaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block"
            >
              <Image
                src={src}
                alt="Instagram — BARNO"
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F7F4EE"
                  strokeWidth="1.5"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#F7F4EE" stroke="none" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
