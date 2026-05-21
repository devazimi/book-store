"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CartDataItems, NavbarProps } from "@/types/propsType/type";
import SearchBox from "./SearchBox";
import SearchBoxMobile from "./SearchBoxMobile";
import Profile from "./Profile";

export default function Navbar({ data }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "خانه" },
    { href: "/main", label: "کتاب ها" },
    { href: "/##", label: "دسته بندی" },
    { href: "/#", label: "پرفروش ها" },
  ];

  const cartLength = data?.cart?.items.reduce(
    (sum: number, item: CartDataItems) => sum + item.quantity,
    0,
  );

  const user = data?.session?.user;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-xl border-b border-gray-100 mb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20 gap-4 md:gap-6 lg:gap-10 justify-center">
          {/* Logo*/}
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
            {/* <span className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
              کتاب‌خانه
            </span> */}
          </a>

          {/* Desktop links*/}
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

          {/* Search box*/}
          <SearchBox />

          {/* Spacer for mobile*/}
          <div className="flex-1 sm:hidden" />

          {/* Icons*/}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile search*/}
            <SearchBoxMobile />

            {/* Favorites*/}
            {/* <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-gray-50 transition-colors relative">
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
            </button> */}

            {/* Cart*/}
            <Link href={"/cart"}>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors relative">
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
                  {cartLength ? cartLength : 0}
                </span>
              </button>
            </Link>

            {/* Profile */}
            <Profile user={user} />

            {/* Burger menu*/}
            {/* <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
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
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
