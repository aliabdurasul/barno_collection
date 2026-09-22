import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import ToastHost from "@/components/ToastHost";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "BARNO — Ayollar kiyimi, oyoq kiyim, sumka va aksessuarlar",
  description:
    "Instagram va Telegramdan kelgan mijozlarni tez va hatosiz buyurtmaga aylantiruvchi premium fashion platforma."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className={`${fraunces.variable} ${inter.variable}`}>
        <AppProvider>
          {children}
          <ToastHost />
        </AppProvider>
      </body>
    </html>
  );
}
