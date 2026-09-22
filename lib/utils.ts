import { OrderStatus } from "@/types";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("uz-UZ").format(value) + " so'm";
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("uz-UZ").format(value);
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const date = formatDate(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${date}, ${hh}:${mm}`;
}

let counter = 1049;
export function generateOrderId() {
  counter += 1;
  return `BN-${counter}`;
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  yangi: "Yangi",
  tolov_kutilmoqda: "To'lov kutilmoqda",
  tolov_tasdiqlandi: "To'lov tasdiqlandi",
  tayyorlanmoqda: "Tayyorlanmoqda",
  kuryerga_berildi: "Kuryerga berildi",
  yetkazildi: "Yetkazildi",
  bekor_qilindi: "Bekor qilindi"
};

export const orderStatusTone: Record<OrderStatus, string> = {
  yangi: "bg-paper2 text-inksoft",
  tolov_kutilmoqda: "bg-[#F4E6CE] text-warn",
  tolov_tasdiqlandi: "bg-[#DDEADD] text-success",
  tayyorlanmoqda: "bg-[#DDEADD] text-success",
  kuryerga_berildi: "bg-[#DCE4EF] text-[#3A5A85]",
  yetkazildi: "bg-ink text-paper",
  bekor_qilindi: "bg-[#F2DAD5] text-danger"
};

export function totalStock(stock: Record<string, number>) {
  return Object.values(stock).reduce((a, b) => a + b, 0);
}

export function stockLabel(qty: number) {
  if (qty <= 0) return "Tugagan";
  if (qty <= 3) return `Kam qoldi — ${qty} dona`;
  return "Mavjud";
}
