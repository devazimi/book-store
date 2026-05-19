import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import { getNavbardata } from "@/lib/getNavbarData";

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
  const data = await getNavbardata();

  return (
    <html lang="en" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-gray-300">
        <Navbar data={data} />
        <div>{children}</div>
      </body>
    </html>
  );
}
