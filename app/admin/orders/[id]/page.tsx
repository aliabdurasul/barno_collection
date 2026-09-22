"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { formatPrice, formatDateTime, orderStatusLabels, orderStatusTone } from "@/lib/utils";
import { OrderStatus } from "@/types";

const NEXT_STEPS: Partial<Record<OrderStatus, { next: OrderStatus; label: string }>> = {
  tolov_tasdiqlandi: { next: "tayyorlanmoqda", label: "Tayyorlanmoqda deb belgilash" },
  tayyorlanmoqda: { next: "kuryerga_berildi", label: "Kuryerga berildi deb belgilash" },
  kuryerga_berildi: { next: "yetkazildi", label: "Yetkazildi deb belgilash" }
};

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { orders, adminConfirmPayment, updateOrderStatus } = useApp();
  const order = orders.find((o) => o.id === params.id);

  if (!order) return notFound();

  const nextStep = NEXT_STEPS[order.orderStatus];
  const canCancel = order.orderStatus !== "yetkazildi" && order.orderStatus !== "bekor_qilindi";

  return (
    <div className="p-5 md:p-10 max-w-3xl">
      <Link href="/admin/orders" className="text-[12px] text-stone hover:text-ink">
        ← Buyurtmalar
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-8">
        <h1 className="font-display text-[26px] md:text-[32px] text-ink">{order.id}</h1>
        <span className={`px-2.5 py-1.5 text-[12px] ${orderStatusTone[order.orderStatus]}`}>
          {orderStatusLabels[order.orderStatus]}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border border-line p-5">
          <p className="label-eyebrow mb-3">MIJOZ MA&apos;LUMOTLARI</p>
          <p className="text-[13.5px] text-ink">{order.customerName}</p>
          <p className="text-[13px] text-inksoft mt-1">{order.phone}</p>
          <p className="text-[13px] text-inksoft mt-1">
            {order.deliveryType === "olib_ketish" ? "Do'kondan olib ketish" : `${order.city}, ${order.address}`}
          </p>
          {order.note && <p className="text-[12.5px] text-stone mt-2">Izoh: {order.note}</p>}
        </div>
        <div className="border border-line p-5">
          <p className="label-eyebrow mb-3">TO&apos;LOV</p>
          <p className="text-[13.5px] mb-1">
            Holat:{" "}
            <span className={order.paymentStatus === "tasdiqlangan" ? "text-success" : "text-warn"}>
              {order.paymentStatus === "tasdiqlangan" ? "Tasdiqlangan" : "Kutilmoqda"}
            </span>
          </p>
          <p className="text-[13.5px] text-ink font-medium mt-2">{formatPrice(order.total)}</p>
          <p className="text-[12px] text-stone mt-1">Manba: {order.source}</p>
          <p className="text-[12px] text-stone mt-1">{formatDateTime(order.createdAt)}</p>

          {order.paymentStatus === "kutilmoqda" && (
            <button
              onClick={() => adminConfirmPayment(order.id)}
              className="btn btn-primary w-full mt-4"
            >
              To&apos;lovni tasdiqlash
            </button>
          )}
        </div>
      </div>

      <div className="border border-line p-5 mb-6">
        <p className="label-eyebrow mb-4">MAHSULOTLAR</p>
        <div className="flex flex-col divide-y divide-line">
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between py-3 text-[13px]">
              <div>
                <p className="text-ink">{it.name}</p>
                <p className="text-inksoft text-[12px] mt-0.5">
                  Rang: {it.color} · O&apos;lcham: {it.size} · {it.qty} dona
                </p>
              </div>
              <span className="text-ink">{formatPrice(it.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-4 mt-2 border-t border-line text-[14px] font-medium text-ink">
          <span>Jami</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {nextStep && (
          <button
            onClick={() => updateOrderStatus(order.id, nextStep.next)}
            className="btn btn-outline"
          >
            {nextStep.label}
          </button>
        )}
        {canCancel && (
          <button
            onClick={() => updateOrderStatus(order.id, "bekor_qilindi")}
            className="btn btn-ghost text-danger"
          >
            Buyurtmani bekor qilish
          </button>
        )}
      </div>
    </div>
  );
}
