"use client";

import { useLogic } from "@/hooks/useLogic";
import { OrdersPageProps } from "@/types/propsType/type";
import {
  FiUser,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiDelete,
} from "react-icons/fi";

import { deleteOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";

export default function OrderPageComponent({ user, orders }: OrdersPageProps) {
  const router = useRouter();

  const { dollarToToman } = useLogic();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          text: "در حال آماده سازی",
          color: "text-amber-600 bg-amber-50",
        };
      case "delivered":
        return { text: "تحویل داده شد", color: "text-green-600 bg-green-50" };
      case "cancelled":
        return { text: "لغو شده", color: "text-red-600 bg-red-50" };
      default:
        return { text: status, color: "text-gray-600 bg-gray-50" };
    }
  };

  const toPersianDate = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder(id);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto p-4 sm:p-6">
      {orders.map((order) => {
        const statusInfo = getStatusInfo(order.status);
        const persianDate = toPersianDate(order.createdAt);

        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            {/* Header */}
            <div className="flex justify-between bg-gradient-to-r from-gray-50 to-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                اطلاعات سفارش
              </h2>
              <button
                className="flex gap-3 items-center text-xs text-white bg-red-500 p-2 rounded-full hover:cursor-pointer hover:shadow-md hover:bg-red-600 transition-all"
                onClick={() => handleDeleteOrder(order.id)}
              >
                <p>حذف سفارش</p>
                <FiDelete />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {/* Username */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FiUser className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 whitespace-nowrap">
                      نام کاربری
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap">
                      {user.username}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-green-100 flex items-center justify-center">
                    <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 whitespace-nowrap">
                      آدرس
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 max-w-[200px] sm:max-w-[250px] break-words">
                      {order.address}
                    </p>
                  </div>
                </div>

                {/* Created Date */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 whitespace-nowrap">
                      تاریخ سفارش
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap">
                      {persianDate}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${statusInfo.color.replace("text-", "bg-").replace("600", "100").replace("700", "100").replace("800", "100")}`}
                  >
                    <FiClock
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${statusInfo.color}`}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 whitespace-nowrap">
                      وضعیت
                    </p>
                    <p
                      className={`text-xs sm:text-sm p-1 font-medium whitespace-nowrap ${statusInfo.color}`}
                    >
                      {statusInfo.text}
                    </p>
                  </div>
                </div>

                {/* Total Price */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FiDollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 whitespace-nowrap">
                      مبلغ کل
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {dollarToToman(order.totalPrice)} تومان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
