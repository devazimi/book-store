"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CartDataItems, NavbarProps } from "@/types/propsType/type";

export default function Navbar({ cart }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "خانه" },
    { href: "/main", label: "کتاب ها" },
    { href: "/##", label: "دسته بندی" },
    { href: "/#", label: "پرفروش ها" },
  ];

  const cartLength = cart?.items.reduce(
    (sum: number, item: CartDataItems) => sum + item.quantity,
    0,
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20 gap-4 md:gap-6 lg:gap-10">
          {/* لوگو */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 bg-[#4b7995] rounded-2xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
              کتاب‌خانه
            </span>
          </a>

          {/* لینک‌های دسکتاپ */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item: { href: string; label: string }) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "px-3 py-2 text-sm text-black hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50 font-medium"
                      : "px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50 font-medium"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* سرچ باکس */}
          <div className="hidden sm:flex flex-1 max-w-md">
            <div className="relative w-full">
              <svg
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="جستجوی کتاب، نویسنده یا ناشر..."
                className="w-full h-10 bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-50 transition-all"
              />
            </div>
          </div>

          {/* اسپیسر برای موبایل */}
          <div className="flex-1 sm:hidden" />

          {/* آیکون‌ها */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* سرچ موبایل */}
            <button className="sm:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* علاقه‌مندی */}
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-gray-50 transition-colors relative">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4b7995] rounded-full" />
            </button>

            {/* سبد خرید */}
            <Link href={"/cart"}>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors relative">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#4b7995] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cartLength && cartLength}
                </span>
              </button>
            </Link>

            {/* پروفایل دسکتاپ */}
            <button className="hidden md:flex items-center gap-2 h-10 px-4 bg-[#4b7995] text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden lg:inline">ورود</span>
            </button>

            {/* پروفایل موبایل */}
            <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#4b7995] text-white">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* منوی همبرگر */}
            <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
