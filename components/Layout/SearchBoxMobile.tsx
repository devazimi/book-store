"use client";

import { useEffect, useState, useRef } from "react";

export default function SearchBoxMobile() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // to close search when click out side
  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      const target = event.target as Node;

      if (buttonRef.current && buttonRef.current.contains(target)) {
        return;
      }

      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(target) &&
        searchOpen
      ) {
        setSearchOpen(false);
        setQuery("");
        setShowDropdown(false);
        setResults([]);
      }
    }

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (query.length < 2) {
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
        setIsLoading(false);
      } catch (err) {
        console.log("خطا در جستجو : ", err);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, isLoading]);

  return (
    <>
      {/*  */}
      <button
        ref={buttonRef}
        className="relative sm:hidden w-full h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
        onClick={() => setSearchOpen(!searchOpen)}
      >
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
      {/*  */}

      {searchOpen && (
        <div
          ref={searchBoxRef}
          className="absolute top-full right-0 left-0 bg-white px-2  sm:hidden flex-1 w-full"
        >
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
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length < 2) {
                  setResults([]);
                  setIsLoading(false);
                } else {
                  setIsLoading(true);
                }
              }}
            />
            {showDropdown && (
              <div className="absolute top-full w-full flex flex-col gap-5 bg-white shadow-2xl p-2 ">
                {isLoading && (
                  <div className="flex flex-row border-gray-200">
                    <h1 className="text-sm text-gray-400 font-bold">
                      در حال جستجو...
                    </h1>
                  </div>
                )}
                {!isLoading && query.length > 2 && results.length === 0 && (
                  <div className="flex flex-row border-gray-200">
                    <h1 className="text-sm text-red-600 font-bold ">
                      موردی پیدا نشد!
                    </h1>
                  </div>
                )}
                {!isLoading &&
                  results.length > 0 &&
                  results?.map(
                    (item: { id: string; title: string; author: string }) => (
                      <div
                        key={item.id}
                        className="flex flex-row gap-2 p-2 border-b-1 border-gray-200 hover:cursor-pointer"
                      >
                        <h1 className="text-sm text-gray-600 font-bold hover:text-gray-700 ">
                          {item.title}
                        </h1>
                        <span>-</span>
                        <h1 className="text-sm text-gray-500 hover:text-gray-600">
                          {item.author}
                        </h1>
                      </div>
                    ),
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
