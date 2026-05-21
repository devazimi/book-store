import localFont from "next/font/local";
import "./globals.css";

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

  return (
    <html lang="en" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-white">
        <div>{children}</div>
      </body>
    </html>
  );
}
