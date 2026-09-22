"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as seedProducts } from "@/data/products";
import { initialOrders } from "@/data/orders";
import { defaultSettings } from "@/data/settings";
import { Order, OrderItem, OrderStatus, Product, StoreSettings } from "@/types";
import { generateOrderId } from "./utils";

export interface CartLine {
  productId: string;
  color: string;
  size: string;
  qty: number;
}

interface Toast {
  id: number;
  message: string;
  tone: "success" | "info" | "error";
}

interface AppState {
  products: Product[];
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  settings: StoreSettings;
  toasts: Toast[];
  addToCart: (line: CartLine) => void;
  updateCartQty: (index: number, qty: number) => void;
  removeCartLine: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  createOrder: (input: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    note?: string;
    deliveryType: "yetkazib_berish" | "olib_ketish";
    source: "instagram" | "telegram" | "sayt";
  }) => Order;
  confirmCustomerPayment: (orderId: string) => void;
  adminConfirmPayment: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateSettings: (patch: Partial<StoreSettings>) => void;
  pushToast: (message: string, tone?: Toast["tone"]) => void;
  cartCount: number;
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "barno-store-v1";

function loadPersisted() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  useEffect(() => {
    const persisted = loadPersisted();
    if (persisted) {
      if (persisted.products) setProducts(persisted.products);
      if (persisted.cart) setCart(persisted.cart);
      if (persisted.wishlist) setWishlist(persisted.wishlist);
      if (persisted.orders) setOrders(persisted.orders);
      if (persisted.settings) setSettings(persisted.settings);
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ products, cart, wishlist, orders, settings })
    );
  }, [products, cart, wishlist, orders, settings, hydrated]);

  function pushToast(message: string, tone: Toast["tone"] = "success") {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }

  function addToCart(line: CartLine) {
    setCart((prev) => {
      const idx = prev.findIndex(
        (l) => l.productId === line.productId && l.color === line.color && l.size === line.size
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
        return next;
      }
      return [...prev, line];
    });
    setCartDrawerOpen(true);
  }

  function updateCartQty(index: number, qty: number) {
    setCart((prev) => prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l)));
  }

  function removeCartLine(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(productId: string) {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function createOrder(input: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    note?: string;
    deliveryType: "yetkazib_berish" | "olib_ketish";
    source: "instagram" | "telegram" | "sayt";
  }): Order {
    const items: OrderItem[] = cart.map((line) => {
      const p = products.find((pp) => pp.id === line.productId)!;
      return {
        productId: p.id,
        name: p.name,
        image: p.image,
        color: line.color,
        size: line.size,
        qty: line.qty,
        price: p.price
      };
    });
    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const deliveryFee =
      input.deliveryType === "olib_ketish"
        ? 0
        : subtotal >= settings.freeDeliveryThreshold
        ? 0
        : settings.deliveryFee;
    const order: Order = {
      id: generateOrderId(),
      customerName: input.customerName,
      phone: input.phone,
      address: input.address,
      city: input.city,
      note: input.note,
      deliveryType: input.deliveryType,
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      paymentStatus: "kutilmoqda",
      orderStatus: "tolov_kutilmoqda",
      source: input.source,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  }

  function confirmCustomerPayment(orderId: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, customerConfirmed: true } : o))
    );
  }

  function adminConfirmPayment(orderId: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, paymentStatus: "tasdiqlangan", orderStatus: "tolov_tasdiqlandi" }
          : o
      )
    );
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setProducts((prev) =>
        prev.map((p) => {
          const line = order.items.find((it) => it.productId === p.id);
          if (!line) return p;
          const nextStock = { ...p.stock };
          nextStock[line.size] = Math.max(0, (nextStock[line.size] ?? 0) - line.qty);
          return { ...p, stock: nextStock };
        })
      );
    }
    pushToast("To'lov tasdiqlandi, zaxiradan yechildi", "success");
  }

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o)));
  }

  function addProduct(product: Product) {
    setProducts((prev) => [product, ...prev]);
    pushToast("Mahsulot qo'shildi");
  }

  function updateProduct(id: string, patch: Partial<Product>) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    pushToast("Mahsulot yangilandi");
  }

  function deleteProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    pushToast("Mahsulot o'chirildi", "info");
  }

  function updateSettings(patch: Partial<StoreSettings>) {
    setSettings((prev) => ({ ...prev, ...patch }));
    pushToast("Sozlamalar saqlandi");
  }

  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0);

  const value: AppState = {
    products,
    cart,
    wishlist,
    orders,
    settings,
    toasts,
    addToCart,
    updateCartQty,
    removeCartLine,
    clearCart,
    toggleWishlist,
    createOrder,
    confirmCustomerPayment,
    adminConfirmPayment,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    updateSettings,
    pushToast,
    cartCount,
    cartDrawerOpen,
    openCartDrawer: () => setCartDrawerOpen(true),
    closeCartDrawer: () => setCartDrawerOpen(false)
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
