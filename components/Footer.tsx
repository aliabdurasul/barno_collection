"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import { navCategories } from "@/data/categories";

const HELP_LINKS = [
  { label: "Yetkazib berish", href: "/checkout" },
  { label: "To'lov", href: "/checkout" },
  { label: "Buyurtma", href: "/orders" },
  { label: "Qaytarish", href: "/" },
  { label: "Aloqa", href: "/" }
];

export default function Footer() {
  const { settings } = useApp();
  const instaHref = `https://${settings.instagram.replace(/^https?:\/\//, "")}`;

  return (
    <footer className="border-t border-line mt-20 pb-24 md:pb-0">
      <div className="container-x py-14 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-[22px] tracking-wide2 text-ink mb-3">{settings.storeName}</p>
          <p className="text-[13px] text-inksoft leading-relaxed max-w-xs">
            Ayollar kiyimi, oyoq kiyim, sumka va aksessuarlar — nafis va zamonaviy uslub.
          </p>
        </div>
        <div>
          <p className="label-eyebrow mb-3">KATEGORIYALAR</p>
          <ul className="flex flex-col gap-2">
            {navCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="text-[13px] text-inksoft hover:text-ink">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-eyebrow mb-3">YORDAM</p>
          <ul className="flex flex-col gap-2">
            {HELP_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13px] text-inksoft hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-eyebrow mb-3">ALOQA</p>
          <ul className="flex flex-col gap-2 text-[13px] text-inksoft">
            <li>{settings.address}</li>
            <li>{settings.phone}</li>
            <li>{settings.hours}</li>
          </ul>
        </div>
        <div>
          <p className="label-eyebrow mb-3">IJTIMOIY TARMOQLAR</p>
          <ul className="flex flex-col gap-2 text-[13px] text-inksoft">
            <li>
              <a href={instaHref} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Instagram
              </a>
            </li>
            <li>{settings.telegram}</li>
          </ul>
          <Link href="/admin" className="inline-block mt-6 text-[11px] tracking-wide2 text-stone hover:text-ink">
            ADMIN PANELINI KO'RISH →
          </Link>
        </div>
      </div>
      <div className="container-x py-5 border-t border-line text-[11px] text-stone">
        © 2026 {settings.storeName}. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
