"use client";

import { useApp } from "@/lib/store";

export default function ToastHost() {
  const { toasts } = useApp();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center w-full px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-enter px-5 py-3 text-sm shadow-lg max-w-sm text-center ${
            t.tone === "error"
              ? "bg-danger text-paper"
              : t.tone === "info"
              ? "bg-ink text-paper"
              : "bg-ink text-paper"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
