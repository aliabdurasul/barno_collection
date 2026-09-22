"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useApp } from "@/lib/store";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { OrderStatus } from "@/types";

const TIMELINE: { status: OrderStatus | "confirmed_step"; label: string }[] = [
  { status: "yangi", label: "Buyurtma qabul qilindi" },
  { status: "tolov_tasdiqlandi", label: "To'lov tasdiqlandi" },
  { status: "tayyorlanmoqda", label: "Tayyorlanmoqda" },
  { status: "kuryerga_berildi", label: "Kuryerga topshirildi" },
  { status: "yetkazildi", label: "Yetkazildi" }
];

const ORDER_INDEX: Record<OrderStatus, number> = {
  yangi: 0,
  tolov_kutilmoqda: 0,
  tolov_tasdiqlandi: 1,
  tayyorlanmoqda: 2,
  kuryerga_berildi: 3,
  yetkazildi: 4,
  bekor_qilindi: -1
};

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const { orders } = useApp();
  const order = orders.find((o) => o.id === params.id);

  if (!order) return notFound();

  const currentIndex = ORDER_INDEX[order.orderStatus];
  const cancelled = order.orderStatus === "bekor_qilindi";
  const awaitingConfirmation = order.orderStatus === "tolov_kutilmoqda";

  return (
    <div className="container-x py-10 md:py-16 max-w-xl">
      <p className="label-eyebrow mb-2">BUYURTMA {order.id}</p>
      <h1 className="font-display text-[26px] md:text-[32px] text-ink mb-2">Buyurtma qabul qilindi</h1>
      <p className="text-[13.5px] text-inksoft mb-8">
        {cancelled
          ? "Ushbu buyurtma bekor qilingan."
          : awaitingConfirmation
          ? "To'lovingiz tekshirilgandan so'ng buyurtmangiz tasdiqlanadi."
          : "Buyurtmangiz holatini quyida kuzatib borishingiz mumkin."}
      </p>

      {!cancelled && (
        <div className="border border-line p-6 mb-8">
          <div className="flex flex-col">
            {TIMELINE.map((step, i) => {
              const done = i <= currentIndex;
              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${done ? "bg-ink" : "bg-line"}`}
                    />
                    {i < TIMELINE.length - 1 && (
                      <div className={`w-px flex-1 min-h-[28px] ${done ? "bg-ink" : "bg-line"}`} />
                    )}
                  </div>
                  <p className={`text-[13.5px] pb-6 ${done ? "text-ink" : "text-stone"}`}>{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="border border-line p-6 mb-8">
        <p className="label-eyebrow mb-4">BUYURTMA TAFSILOTLARI</p>
        <div className="flex flex-col gap-2 mb-4">
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between text-[12.5px] text-inksoft">
              <span>
                {it.name} ({it.color}, {it.size}) × {it.qty}
              </span>
              <span className="text-ink">{formatPrice(it.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[14px] text-ink font-medium pt-3 border-t border-line">
          <span>Jami</span>
          <span>{formatPrice(order.total)}</span>
        </div>
        <p className="text-[11.5px] text-stone mt-3">{formatDateTime(order.createdAt)}</p>
      </div>

      <Link href={`/orders/${order.id}`} className="btn btn-outline w-full">
        Buyurtmani kuzatish
      </Link>
      <Link href="/" className="btn btn-ghost w-full mt-2">
        Xaridni davom ettirish
      </Link>
    </div>
  );
}
