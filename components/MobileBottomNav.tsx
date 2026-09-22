"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";

const items = [
  {
    href: "/",
    label: "Bosh sahifa",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth={a ? 2 : 1.4}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v10h14V10" />
      </svg>
    )
  },
  {
    href: "/category/ayollar-kiyimi",
    label: "Kategoriyalar",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth={a ? 2 : 1.4}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    )
  },
  {
    href: "/search",
    label: "Qidirish",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth={a ? 2 : 1.4}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  },
  {
    href: "/wishlist",
    label: "Sevimlilar",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth={a ? 2 : 1.4}>
        <path d="M12 21s-7.5-4.6-10-9.1C0.3 8.3 2 4.5 5.6 4.1c2-.2 3.7.9 4.9 2.6C11.7 5 13.4 3.9 15.4 4.1c3.6.4 5.3 4.2 3.6 7.8C19.5 16.4 12 21 12 21z" />
      </svg>
    )
  },
  {
    href: "/cart",
    label: "Savat",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth={a ? 2 : 1.4}>
        <path d="M6 7h15l-1.5 9.5a2 2 0 0 1-2 1.5H8.7a2 2 0 0 1-2-1.7L5 3H2" />
        <circle cx="9" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
    )
  }
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, wishlist } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-paper border-t border-line">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href.split("?")[0]);
          return (
            <Link key={it.href} href={it.href} className="flex flex-col items-center gap-1 py-2.5 relative">
              {it.icon(active)}
              <span className={`text-[9.5px] ${active ? "text-ink" : "text-stone"}`}>{it.label}</span>
              {it.label === "Savat" && cartCount > 0 && (
                <span className="absolute top-1 right-[26%] w-3.5 h-3.5 rounded-full bg-ink text-paper text-[8px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              {it.label === "Sevimlilar" && wishlist.length > 0 && (
                <span className="absolute top-1 right-[26%] w-3.5 h-3.5 rounded-full bg-ink text-paper text-[8px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
