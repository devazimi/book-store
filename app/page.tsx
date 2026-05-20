"use client";
import { useRouter } from "next/navigation";

import { FaBookOpen } from "react-icons/fa";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      router.push("/main");
    }, 3000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="animate-[fadeIn_1.5s_ease-in-out] flex flex-col w-screnn h-screen justify-center items-center bg-[#4b7995] gap-2">
      <FaBookOpen className="animate-[fadeInUp_1.5s_ease-out] text-white text-9xl" />
      <h1 className="animate-[fadeInUp_1.5s_ease-out] text-8xl font-bold text-white">
        پَسجلد
      </h1>
    </div>
  );
}
