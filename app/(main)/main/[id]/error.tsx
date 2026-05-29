"use client";

import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error,
    reset: () => void;
}){
    const router = useRouter();

    console.log('error: ', error.message)
    return(
        <div className="flex gap-5 justify-center items-center w-full">
            <div className="flex flex-col gap-7 justify-center items-center bg-gray-100 rounded-xl p-5 md:p-10">
            <h1 className="text-md">مشکلی در دریافت اطلاعات بوجود اومده !</h1>
            <div className="flex flex-col sm:flex-row gap-5">
                <button className="w-auto h-10 px-5 rounded-md text-xs bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer"
                    onClick={() => reset()}
                >تلاش مجدد</button>
                <button className="w-auto h-10 px-5 rounded-md text-xs bg-orange-500 text-white hover:bg-orange-600 hover:cursor-pointer"
                    onClick={() => router.back()}
                >برگشت به صفحه قبل</button>

            </div>
            </div>
        </div>
    )
}