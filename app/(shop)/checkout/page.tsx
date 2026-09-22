"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, products, settings, createOrder } = useApp();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Toshkent");
  const [note, setNote] = useState("");
  const [deliveryType, setDeliveryType] = useState<"yetkazib_berish" | "olib_ketish">("yetkazib_berish");
  const [source, setSource] = useState<"instagram" | "telegram" | "sayt">("instagram");
  const [submitting, setSubmitting] = useState(false);

  const lines = cart.map((line) => ({ ...line, product: products.find((p) => p.id === line.productId)! }));
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const deliveryFee =
    deliveryType === "olib_ketish" ? 0 : subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee;
  const total = subtotal + deliveryFee;

  if (lines.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <p className="text-inksoft text-sm mb-6">Savat bo&apos;sh. Avval mahsulot tanlang.</p>
        <Link href="/" className="btn btn-primary">
          Xarid qilishni boshlash
        </Link>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || (deliveryType === "yetkazib_berish" && !address.trim())) return;
    setSubmitting(true);
    const order = createOrder({
      customerName: name.trim(),
      phone: phone.trim(),
      address: address.trim() || "—",
      city,
      note: note.trim() || undefined,
      deliveryType,
      source
    });
    router.push(`/checkout/payment/${order.id}`);
  }

  return (
    <div className="container-x py-8 md:py-12">
      <h1 className="font-display text-[26px] md:text-[34px] text-ink mb-8">Buyurtmani rasmiylashtirish</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="md:col-span-2 flex flex-col gap-4">
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">ISM VA FAMILIYA</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="input" placeholder="Ism va familiya" />
          </div>
          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">TELEFON RAQAMI</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="input" placeholder="+998 90 123 45 67" />
          </div>

          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">TESLIMAT SECHIMI</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeliveryType("yetkazib_berish")}
                className={`flex-1 py-3 text-[13px] border ${deliveryType === "yetkazib_berish" ? "border-ink bg-ink text-paper" : "border-line text-inksoft"}`}
              >
                Yetkazib berish
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType("olib_ketish")}
                className={`flex-1 py-3 text-[13px] border ${deliveryType === "olib_ketish" ? "border-ink bg-ink text-paper" : "border-line text-inksoft"}`}
              >
                Olib ketish
              </button>
            </div>
          </div>

          {deliveryType === "yetkazib_berish" && (
            <>
              <div>
                <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">SHAHAR</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} className="input" />
              </div>
              <div>
                <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">YETKAZIB BERISH MANZILI</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} required className="input" placeholder="Tuman, ko'cha, uy" />
              </div>
            </>
          )}

          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">IZOH (IXTIYORIY)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="input" placeholder="Qo'shimcha izoh" />
          </div>

          <div>
            <label className="text-[12px] tracking-wide2 text-inksoft block mb-1.5">QAYERDAN BILDINGIZ?</label>
            <div className="flex gap-2">
              {(["instagram", "telegram", "sayt"] as const).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSource(s)}
                  className={`flex-1 py-2.5 text-[12.5px] border capitalize ${source === s ? "border-ink bg-ink text-paper" : "border-line text-inksoft"}`}
                >
                  {s === "sayt" ? "Sayt" : s === "instagram" ? "Instagram" : "Telegram"}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary mt-4">
            Buyurtma berish
          </button>
        </form>

        <div className="md:col-span-1">
          <div className="border border-line p-6 sticky top-24">
            <p className="label-eyebrow mb-4">MAHSULOTLAR</p>
            <div className="flex flex-col gap-3 mb-5">
              {lines.map((l, i) => (
                <div key={i} className="flex justify-between text-[12.5px] text-inksoft">
                  <span className="pr-2">
                    {l.product.name} ({l.color}, {l.size}) × {l.qty}
                  </span>
                  <span className="shrink-0 text-ink">{formatPrice(l.product.price * l.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[13px] text-inksoft mb-2 pt-4 border-t border-line">
              <span>Yetkazib berish</span>
              <span>{deliveryFee === 0 ? "Bepul" : formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-[15px] text-ink font-medium pt-2">
              <span>Jami</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
