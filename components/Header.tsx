"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { navCategories } from "@/data/categories";
import { useApp } from "@/lib/store";

export default function Header() {
  const { cartCount, wishlist } = useApp();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="container-x">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3 md:hidden">
            <button aria-label="Menyu" onClick={() => setMenuOpen((v) => !v)} className="p-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth="1.5">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>

          <Link href="/" className="font-display text-[22px] md:text-[26px] tracking-wide2 text-ink">
            BARNO
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="text-[13px] text-inksoft hover:text-ink transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              aria-label="Qidirish"
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden md:block"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <Link href="/wishlist" aria-label="Sevimlilar" className="relative hidden md:block">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth="1.5">
                <path d="M12 21s-7.5-4.6-10-9.1C0.3 8.3 2 4.5 5.6 4.1c2-.2 3.7.9 4.9 2.6C11.7 5 13.4 3.9 15.4 4.1c3.6.4 5.3 4.2 3.6 7.8C19.5 16.4 12 21 12 21z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-ink text-paper text-[9px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" aria-label="Savat" className="relative">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1B1815" strokeWidth="1.5">
                <path d="M6 7h15l-1.5 9.5a2 2 0 0 1-2 1.5H8.7a2 2 0 0 1-2-1.7L5 3H2" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="18" cy="21" r="1" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-ink text-paper text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="hidden md:block pb-4">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="input"
            />
          </form>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-line bg-paper">
          <div className="container-x py-4 flex flex-col gap-1">
            <form onSubmit={submitSearch} className="mb-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Qidirish..."
                className="input"
              />
            </form>
            {navCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-[14px] text-ink border-b border-line"
              >
                {c.name}
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="py-3 text-[14px] text-ink">
              Sevimlilar {wishlist.length > 0 ? `(${wishlist.length})` : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
