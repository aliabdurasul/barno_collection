"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState(settings);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateSettings(form);
  }

  return (
    <div className="p-5 md:p-10 max-w-2xl">
      <p className="label-eyebrow mb-1">SOZLAMALAR</p>
      <h1 className="font-display text-[26px] md:text-[32px] text-ink mb-6">Do&apos;kon sozlamalari</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">DO&apos;KON NOMI</label>
          <input value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} className="input" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">TELEFON</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">MANZIL</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">INSTAGRAM</label>
            <input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">TELEGRAM</label>
            <input value={form.telegram} onChange={(e) => setForm({ ...form, telegram: e.target.value })} className="input" />
          </div>
        </div>
        <div>
          <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">ISH VAQTI</label>
          <input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} className="input" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">YETKAZIB BERISH NARXI (so&apos;m)</label>
            <input
              type="number"
              value={form.deliveryFee}
              onChange={(e) => setForm({ ...form, deliveryFee: Number(e.target.value) })}
              className="input"
            />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">BEPUL YETKAZIB BERISH CHEGARASI (so&apos;m)</label>
            <input
              type="number"
              value={form.freeDeliveryThreshold}
              onChange={(e) => setForm({ ...form, freeDeliveryThreshold: Number(e.target.value) })}
              className="input"
            />
          </div>
        </div>
        <div>
          <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">TO&apos;LOV YO&apos;RIQNOMASI</label>
          <textarea
            value={form.paymentInstructions}
            onChange={(e) => setForm({ ...form, paymentInstructions: e.target.value })}
            rows={3}
            className="input"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2 w-fit">
          Saqlash
        </button>
      </form>
    </div>
  );
}
