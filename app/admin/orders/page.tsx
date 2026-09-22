"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/lib/store";
import { formatPrice, formatDateTime, orderStatusLabels, orderStatusTone } from "@/lib/utils";
import { OrderStatus } from "@/types";

const STATUS_FILTERS: { key: OrderStatus | "hammasi"; label: string }[] = [
  { key: "hammasi", label: "Barchasi" },
  { key: "yangi", label: "Yangi" },
  { key: "tolov_kutilmoqda", label: "To'lov kutilmoqda" },
  { key: "tolov_tasdiqlandi", label: "To'lov tasdiqlandi" },
  { key: "tayyorlanmoqda", label: "Tayyorlanmoqda" },
  { key: "kuryerga_berildi", label: "Kuryerga berildi" },
  { key: "yetkazildi", label: "Yetkazildi" },
  { key: "bekor_qilindi", label: "Bekor qilindi" }
];

function OrdersInner() {
  const { orders } = useApp();
  const params = useSearchParams();
  const initialFilter = (params.get("filter") as OrderStatus) || "hammasi";
  const [filter, setFilter] = useState<OrderStatus | "hammasi">(initialFilter);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = filter === "hammasi" ? orders : orders.filter((o) => o.orderStatus === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (o) => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.phone.includes(q)
      );
    }
    return [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [orders, filter, query]);

  return (
    <div className="p-5 md:p-10">
      <p className="label-eyebrow mb-1">BUYURTMALAR</p>
      <h1 className="font-display text-[26px] md:text-[32px] text-ink mb-6">Buyurtmalar</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buyurtma raqami, mijoz yoki telefon bo'yicha qidirish..."
        className="input max-w-md mb-4"
      />

      <div className="flex flex-wrap gap-1.5 mb-6">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-[12px] border ${
              filter === f.key ? "border-ink bg-ink text-paper" : "border-line text-inksoft"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="border border-line overflow-x-auto">
        <table className="admin-table min-w-[820px]">
          <thead>
            <tr>
              <th>Buyurtma</th>
              <th>Mijoz</th>
              <th>Mahsulot</th>
              <th>Summa</th>
              <th>To&apos;lov</th>
              <th>Holat</th>
              <th>Sana</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="text-ink font-medium">{o.id}</td>
                <td>
                  {o.customerName}
                  <br />
                  <span className="text-stone">{o.phone}</span>
                </td>
                <td>
                  {o.items[0].name}
                  {o.items.length > 1 ? ` +${o.items.length - 1}` : ""}
                </td>
                <td className="text-ink">{formatPrice(o.total)}</td>
                <td>
                  <span className={o.paymentStatus === "tasdiqlangan" ? "text-success" : "text-warn"}>
                    {o.paymentStatus === "tasdiqlangan" ? "Tasdiqlangan" : "Kutilmoqda"}
                  </span>
                </td>
                <td>
                  <span className={`px-2 py-1 text-[11px] ${orderStatusTone[o.orderStatus]}`}>
                    {orderStatusLabels[o.orderStatus]}
                  </span>
                </td>
                <td className="text-stone">{formatDateTime(o.createdAt)}</td>
                <td>
                  <Link href={`/admin/orders/${o.id}`} className="text-[12px] text-ink underline">
                    Ko&apos;rish
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-inksoft text-sm py-10">Buyurtmalar topilmadi.</p>
        )}
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={null}>
      <OrdersInner />
    </Suspense>
  );
}
