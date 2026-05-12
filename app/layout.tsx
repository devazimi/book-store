import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import { getCartdata } from "@/lib/getCartData";

const vazirmatn = localFont({
  src: "../public/fonts/Vazir.woff2",
  variable: "--font-vazir",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCartdata();

  return (
    <html lang="en" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-gray-100">
        <Navbar cart={cart} />
        <div>{children}</div>
      </body>
    </html>
  );
}
