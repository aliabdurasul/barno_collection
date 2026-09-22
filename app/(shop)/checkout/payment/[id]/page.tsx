"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { orders, settings, confirmCustomerPayment } = useApp();
  const router = useRouter();
  const order = orders.find((o) => o.id === params.id);
  const [confirming, setConfirming] = useState(false);

  if (!order) return notFound();

  function handleConfirm() {
    setConfirming(true);
    confirmCustomerPayment(order!.id);
    setTimeout(() => {
      router.push(`/orders/${order!.id}`);
    }, 500);
  }

  return (
    <div className="container-x py-10 md:py-16 max-w-md">
      <p className="label-eyebrow mb-2">BUYURTMA {order.id}</p>
      <h1 className="font-display text-[26px] md:text-[32px] text-ink mb-6">To&apos;lov</h1>

      <p className="text-[13.5px] text-inksoft mb-6">
        Quyidagi QR kod orqali to&apos;lovni amalga oshiring.
      </p>

      <div className="border border-line p-8 flex flex-col items-center bg-white">
        <div className="w-48 h-48 bg-paper2 border border-line flex items-center justify-center">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <rect width="150" height="150" fill="#F7F4EE" />
            {Array.from({ length: 12 }).map((_, row) =>
              Array.from({ length: 12 }).map((__, col) => {
                const on = (row * 7 + col * 13 + row * col) % 5 === 0;
                return on ? (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 12.5}
                    y={row * 12.5}
                    width="11"
                    height="11"
                    fill="#1B1815"
                  />
                ) : null;
              })
            )}
          </svg>
        </div>
        <p className="text-[12px] text-stone mt-4">Demo QR kod (namuna)</p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[12px] tracking-wide2 text-inksoft mb-1">TO&apos;LOV SUMMASI</p>
        <p className="font-display text-[28px] text-ink">{formatPrice(order.total)}</p>
      </div>

      <p className="text-[12.5px] text-inksoft leading-relaxed mt-6 border-t border-line pt-5">
        {settings.paymentInstructions}
      </p>

      <p className="text-[12.5px] text-inksoft mt-4">
        To&apos;lovni amalga oshirgach, quyidagi tugmani bosing.
      </p>

      <button onClick={handleConfirm} disabled={confirming} className="btn btn-primary w-full mt-5">
        {confirming ? "Yuborilmoqda..." : "To'lov qildim"}
      </button>

      <p className="text-[11px] text-stone text-center mt-4">
        Platforma sizdan bank kirish parolini yoki login ma&apos;lumotlarini so&apos;ramaydi.
      </p>
    </div>
  );
}
