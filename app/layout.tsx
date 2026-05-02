import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";

const vazirmatn = localFont({
  src: "../public/fonts/Vazir.woff2",
  variable: "--font-vazir",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-gray-100">
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
