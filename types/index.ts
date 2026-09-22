export type CategorySlug =
  | "yangi-kelganlar"
  | "ayollar-kiyimi"
  | "oyoq-kiyim"
  | "sumka"
  | "aksessuarlar"
  | "chegirmalar";

export interface Category {
  slug: CategorySlug;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Exclude<CategorySlug, "yangi-kelganlar" | "chegirmalar">;
  price: number;
  oldPrice?: number;
  description: string;
  details: string[];
  image: string;
  images?: string[];
  video?: string;
  imageType: "photo" | "placeholder";
  placeholderTone?: string;
  colors: string[];
  sizes: string[];
  stock: Record<string, number>; // size -> qty (summed across colors for demo simplicity)
  isNew: boolean;
  isDiscounted: boolean;
  weeklySales: number;
  createdAt: string;
  active?: boolean;
}

export type PaymentStatus = "kutilmoqda" | "tasdiqlangan";
export type OrderStatus =
  | "yangi"
  | "tolov_kutilmoqda"
  | "tolov_tasdiqlandi"
  | "tayyorlanmoqda"
  | "kuryerga_berildi"
  | "yetkazildi"
  | "bekor_qilindi";

export type SalesChannel = "instagram" | "telegram" | "sayt";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  note?: string;
  deliveryType: "yetkazib_berish" | "olib_ketish";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  source: SalesChannel;
  createdAt: string;
  customerConfirmed?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderAt: string;
  type: "yangi" | "qayta_xarid";
}

export interface Look {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  productSlugs: string[];
}

export interface StoreSettings {
  storeName: string;
  phone: string;
  instagram: string;
  telegram: string;
  address: string;
  hours: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  paymentInstructions: string;
}
