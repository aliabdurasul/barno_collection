"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/lib/store";

const links = [
  { href: "/admin", label: "Boshqaruv paneli", exact: true },
  { href: "/admin/orders", label: "Buyurtmalar" },
  { href: "/admin/inventory", label: "Ombor" },
  { href: "/admin/products", label: "Mahsulotlar" },
  { href: "/admin/customers", label: "Mijozlar" },
  { href: "/admin/reports", label: "Hisobotlar" },
  { href: "/admin/settings", label: "Sozlamalar" }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { orders } = useApp();
  const [open, setOpen] = useState(false);
  const pendingPayments = orders.filter((o) => o.orderStatus === "tolov_kutilmoqda").length;

  const nav = (
    <nav className="flex flex-col gap-0.5 p-4">
      {links.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`px-3.5 py-2.5 text-[13px] flex items-center justify-between ${
              active ? "bg-ink text-paper" : "text-inksoft hover:bg-paper2"
            }`}
          >
            <span>{l.label}</span>
            {l.href === "/admin/orders" && pendingPayments > 0 && (
              <span
                className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center ${
                  active ? "bg-paper text-ink" : "bg-warn text-paper"
                }`}
              >
                {pendingPayments}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 bg-ink text-paper flex items-center justify-between px-4 h-14">
        <Link href="/admin" className="font-display tracking-wide2 text-[16px]">
          BARNO · ADMIN
        </Link>
        <button onClick={() => setOpen((v) => !v)} aria-label="Menyu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7F4EE" strokeWidth="1.5">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-paper border-b border-line">
          {nav}
          <div className="px-4 pb-4">
            <Link href="/" className="text-[12px] text-stone">
              ← Mijoz saytiga qaytish
            </Link>
          </div>
        </div>
      )}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-line min-h-screen sticky top-0">
        <Link href="/admin" className="font-display tracking-wide2 text-[18px] text-ink px-6 py-6 border-b border-line">
          BARNO · ADMIN
        </Link>
        {nav}
        <div className="mt-auto p-4 border-t border-line">
          <Link href="/" className="text-[12px] text-stone hover:text-ink">
            ← Mijoz saytiga qaytish
          </Link>
        </div>
      </aside>
    </>
  );
}
