import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazirmatn = localFont({
  src: "../public/fonts/Vazir.woff2", // فونت متغیر
  variable: "--font-vazir", // این متغیر CSS رو می‌سازه
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
