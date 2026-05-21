"use client";

import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center">
      <div className="relative">
        <AiOutlineLoading className="h-20 w-20 animate-spin text-[#4b7995]" />
      </div>
    </div>
  );
}
