"use client";

import { useState } from "react";
import SalesChart from "@/components/SalesChart";
import BarList from "@/components/BarList";
import {
  salesDynamics,
  sizeAnalytics,
  colorAnalytics,
  salesChannels,
  fastSelling,
  topStats
} from "@/data/dashboard";
import { formatPrice } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { categories } from "@/data/categories";

const RANGES = ["Bugun", "7 kun", "30 kun", "3 oy", "Maxsus sana"];

export default function AdminReportsPage() {
  const { products, orders } = useApp();
  const [range, setRange] = useState("30 kun");

  const categoryTotals = categories
    .filter((c) => c.slug !== "yangi-kelganlar" && c.slug !== "chegirmalar")
    .map((c) => ({
      label: c.name,
      value: products.filter((p) => p.category === c.slug).reduce((sum, p) => sum + p.weeklySales, 0)
    }));

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="label-eyebrow mb-1">HISOBOTLAR</p>
          <h1 className="font-display text-[26px] md:text-[32px] text-ink">Hisobotlar</h1>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-2 text-[12px] border ${range === r ? "border-ink bg-ink text-paper" : "border-line text-inksoft"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="border border-line p-5">
          <p className="text-[12px] text-inksoft mb-2">Jami savdo</p>
          <p className="font-display text-[22px] text-ink">{formatPrice(topStats.monthSales.value)}</p>
        </div>
        <div className="border border-line p-5">
          <p className="text-[12px] text-inksoft mb-2">Buyurtmalar</p>
          <p className="font-display text-[22px] text-ink">{orders.length}</p>
        </div>
        <div className="border border-line p-5">
          <p className="text-[12px] text-inksoft mb-2">Mahsulotlar soni</p>
          <p className="font-display text-[22px] text-ink">{products.length}</p>
        </div>
        <div className="border border-line p-5">
          <p className="text-[12px] text-inksoft mb-2">O&apos;rtacha chek</p>
          <p className="font-display text-[22px] text-ink">{formatPrice(topStats.avgCheck.value)}</p>
        </div>
      </div>

      <div className="border border-line p-5 md:p-6 mb-8">
        <p className="label-eyebrow mb-4">SAVDO</p>
        <SalesChart data={salesDynamics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">KATEGORIYALAR BO&apos;YICHA SOTUV (7 KUN)</p>
          <BarList items={categoryTotals.map((c) => ({ label: c.label, value: c.value, suffix: " dona" }))} />
        </div>
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">SAVDO KANALLARI</p>
          <BarList items={salesChannels.map((c) => ({ label: c.channel, value: c.orders, suffix: " ta" }))} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">O&apos;LCHAMLAR</p>
          <BarList items={sizeAnalytics.map((s) => ({ label: s.size, value: s.count, suffix: " dona" }))} />
        </div>
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">RANGLAR</p>
          <BarList items={colorAnalytics.map((c) => ({ label: c.color, value: c.pct, suffix: "%" }))} />
        </div>
      </div>

      <div className="border border-line p-5 md:p-6">
        <p className="label-eyebrow mb-4">MAHSULOTLAR BO&apos;YICHA HISOBOT</p>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mahsulot</th>
              <th>7 kunlik sotuv</th>
              <th>Daromad</th>
            </tr>
          </thead>
          <tbody>
            {fastSelling.map((f) => (
              <tr key={f.name}>
                <td className="text-ink">{f.name}</td>
                <td>{f.weekSales} dona</td>
                <td>{formatPrice(f.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
