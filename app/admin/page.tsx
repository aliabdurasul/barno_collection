"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardCard from "@/components/DashboardCard";
import SalesChart from "@/components/SalesChart";
import BarList from "@/components/BarList";
import {
  topStats,
  salesDynamics,
  actionCenter,
  fastSelling,
  slowMoving,
  sizeAnalytics,
  colorAnalytics,
  salesChannels
} from "@/data/dashboard";
import { formatPrice } from "@/lib/utils";

const RANGES = ["Bugun", "7 kun", "30 kun", "3 oy", "Maxsus sana"];

export default function AdminDashboard() {
  const [range, setRange] = useState("30 kun");

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="label-eyebrow mb-1">BOSHQARUV PANELI</p>
          <h1 className="font-display text-[26px] md:text-[32px] text-ink">Xush kelibsiz, BARNO</h1>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-2 text-[12px] border ${
                range === r ? "border-ink bg-ink text-paper" : "border-line text-inksoft"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        <DashboardCard label="Bugungi savdo" value={formatPrice(topStats.todaySales.value)} changePct={topStats.todaySales.changePct} />
        <DashboardCard label="Oylik savdo" value={formatPrice(topStats.monthSales.value)} changePct={topStats.monthSales.changePct} />
        <DashboardCard label="Buyurtmalar" value={String(topStats.orders.value)} changePct={topStats.orders.changePct} />
        <DashboardCard label="O'rtacha chek" value={formatPrice(topStats.avgCheck.value)} changePct={topStats.avgCheck.changePct} />
      </div>

      <div className="border border-line p-5 md:p-6 mb-8">
        <p className="label-eyebrow mb-4">SAVDO DINAMIKASI</p>
        <SalesChart data={salesDynamics} />
      </div>

      <div className="border border-line p-5 md:p-6 mb-8">
        <p className="label-eyebrow mb-4">BUGUN E&apos;TIBOR KERAK</p>
        <div className="flex flex-col divide-y divide-line">
          {actionCenter.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex items-center justify-between py-3.5 text-[13px] text-ink hover:opacity-70"
            >
              <span>
                <strong className="font-medium">{a.count} ta</strong> {a.label}
              </span>
              <span className="text-stone">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">ENG TEZ SOTILAYOTGAN MAHSULOTLAR</p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mahsulot</th>
                <th>7 kunlik</th>
                <th>Daromad</th>
                <th>Zaxira</th>
                <th>Tezlik</th>
              </tr>
            </thead>
            <tbody>
              {fastSelling.map((f) => (
                <tr key={f.name}>
                  <td className="text-ink">{f.name}</td>
                  <td>{f.weekSales} dona</td>
                  <td>{formatPrice(f.revenue)}</td>
                  <td className={f.stock <= 3 ? "text-warn" : ""}>{f.stock} dona</td>
                  <td>{f.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">SEKIN SOTILAYOTGAN MAHSULOTLAR</p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mahsulot</th>
                <th>30 kunlik sotuv</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              {slowMoving.map((s) => (
                <tr key={s.name}>
                  <td className="text-ink">{s.name}</td>
                  <td>{s.monthSales} dona</td>
                  <td>{s.stock} dona</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">O&apos;LCHAMLAR BO&apos;YICHA SAVDO</p>
          <BarList items={sizeAnalytics.map((s) => ({ label: s.size, value: s.count, suffix: " dona" }))} />
        </div>
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">RANGLAR BO&apos;YICHA SAVDO</p>
          <BarList items={colorAnalytics.map((c) => ({ label: c.color, value: c.pct, suffix: "%" }))} />
        </div>
        <div className="border border-line p-5 md:p-6">
          <p className="label-eyebrow mb-4">SAVDO KANALLARI</p>
          <div className="flex flex-col gap-3">
            {salesChannels.map((c) => (
              <div key={c.channel} className="flex items-center justify-between text-[13px]">
                <span className="text-inksoft">{c.channel}</span>
                <span className="text-ink">
                  {c.orders} buyurtma <span className="text-stone">· {c.pct}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
