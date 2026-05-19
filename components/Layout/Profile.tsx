"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { FiLogOut } from "react-icons/fi";
import { ProfileProps } from "@/types/propsType/type";

export default function Profile({ user }: ProfileProps) {
  const [dropdown, setDropdown] = useState(false);
  // const [profileOpen, setProfileOpen] = useState(false);

  const desktopProfileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      const target = event.target as Node;

      const isMobileButton = mobileButtonRef.current?.contains(target);
      const isDesktopButton = desktopButtonRef.current?.contains(target);

      if (isMobileButton || isDesktopButton) {
        return;
      }

      const desktopOutSide =
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(target);

      const mobileOutSide =
        mobileProfileRef.current && !mobileProfileRef.current.contains(target);

      if (dropdown && desktopOutSide) {
        setDropdown(false);
      }

      if (dropdown && mobileOutSide) {
        setDropdown(false);
      }
    }

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [dropdown]);

  return (
    <>
      <div ref={desktopProfileRef}>
        {/* Desktop*/}
        <div
          className="hidden relative md:flex items-center gap-2 h-10 px-4 bg-[#4b7995] text-white rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-colors text-sm font-medium"
          ref={desktopButtonRef}
          onClick={() => {
            // e.stopPropagation();
            if (user) {
              setDropdown((prev) => !prev);
            } else {
              router.push("/login");
            }
          }}
        >
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
          <span className="hidden lg:inline">
            {user ? user.username : "ورود"}
          </span>
          {/* dropdown */}
          {dropdown && (
            <div className="absolute top-full right-0 w-full bg-white text-gray-700 flex flex-col gap-4 p-4 rounded-xl shadow-2xl">
              <button
                className="flex gap-2 justify-center hover:text-red-500 hover:cursor-pointer transition-all"
                onClick={() => signOut()}
              >
                <FiLogOut className="text-lg" /> خروج
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile*/}
      <div ref={mobileProfileRef}>
        <div
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#4b7995] text-white hover:bg-gray-800 hover:cursor-pointer transition-all"
          ref={mobileButtonRef}
          onClick={() => {
            // e.stopPropagation();
            if (user) {
              setDropdown((prev) => !prev);
            } else {
              router.push("/login");
            }
          }}
        >
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
          {/* dropdown */}
          {dropdown && (
            <div className="absolute top-full right-0 w-full bg-white text-gray-700 flex flex-col gap-4 p-4 rounded-xl shadow-2xl">
              <button
                className="flex gap-2 justify-center hover:text-red-500 hover:cursor-pointer transition-all"
                onClick={() => signOut()}
              >
                <FiLogOut className="text-lg" /> خروج
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
