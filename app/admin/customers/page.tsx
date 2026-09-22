"use client";

import { useState } from "react";
import { customers } from "@/data/customers";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminCustomersPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query)
  );
  const activeCustomer = customers.find((c) => c.id === selected);

  return (
    <div className="p-5 md:p-10">
      <p className="label-eyebrow mb-1">MIJOZLAR</p>
      <h1 className="font-display text-[26px] md:text-[32px] text-ink mb-6">Mijozlar</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ism yoki telefon bo'yicha qidirish..."
        className="input max-w-md mb-6"
      />

      <div className="border border-line overflow-x-auto">
        <table className="admin-table min-w-[700px]">
          <thead>
            <tr>
              <th>Mijoz</th>
              <th>Telefon</th>
              <th>Buyurtmalar soni</th>
              <th>Jami xarid</th>
              <th>Oxirgi buyurtma</th>
              <th>Turi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} onClick={() => setSelected(c.id)} className="cursor-pointer">
                <td className="text-ink">{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.ordersCount}</td>
                <td>{formatPrice(c.totalSpent)}</td>
                <td>{formatDate(c.lastOrderAt)}</td>
                <td>
                  <span className={`text-[11px] px-2 py-1 ${c.type === "yangi" ? "bg-paper2 text-inksoft" : "bg-[#DDEADD] text-success"}`}>
                    {c.type === "yangi" ? "Yangi" : "Qayta xarid qilgan"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeCustomer && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="bg-paper max-w-sm w-full p-6 border border-line" onClick={(e) => e.stopPropagation()}>
            <p className="label-eyebrow mb-1">MIJOZ TAFSILOTLARI</p>
            <h2 className="font-display text-[22px] text-ink mb-4">{activeCustomer.name}</h2>
            <div className="flex flex-col gap-2 text-[13px] text-inksoft">
              <p>Telefon: <span className="text-ink">{activeCustomer.phone}</span></p>
              <p>Buyurtmalar soni: <span className="text-ink">{activeCustomer.ordersCount}</span></p>
              <p>Jami xarid: <span className="text-ink">{formatPrice(activeCustomer.totalSpent)}</span></p>
              <p>Oxirgi buyurtma: <span className="text-ink">{formatDate(activeCustomer.lastOrderAt)}</span></p>
              <p>Turi: <span className="text-ink">{activeCustomer.type === "yangi" ? "Yangi mijoz" : "Qayta xarid qilgan"}</span></p>
            </div>
            <button onClick={() => setSelected(null)} className="btn btn-outline w-full mt-6">
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
