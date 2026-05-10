"use client";

import { decrementQuantity, incrementQuantity } from "@/app/actions/cart";
import { useLogic } from "@/hooks/useLogic";
import { BookType } from "@/types/bookType/type";
import { CartPageProps } from "@/types/propsType/type";

import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { FiBookOpen, FiSend, FiShield } from "react-icons/fi";

export default function CartPageComponent({
  cartItems,
  cartData,
}: CartPageProps) {
  const { dollarToToman, toPersianNumber } = useLogic();

  const cartPriceDollar = cartItems.reduce((sum: number, item: BookType) => {
    const validItem = cartData.data.items.find((c) => c.bookId === item.id);
    if (!validItem) return sum;
    const itemPrice = item.price * validItem.quantity;
    return sum + itemPrice;
  }, 0);

  const cartPriceToman = dollarToToman(cartPriceDollar);

  return (
    // container
    <div className="max-w-[900px] w-full flex flex-col sm:flex-col mx-auto justify-between lg:flex-row md:flex-row px-4 lg:px-0 m-10 gap-8">
      {/* items box */}
      <div className="flex flex-col gap-10 justify-center  lg:w-2/3 md:w-2/3 w-full ">
        <div className="flex flex-row gap-2 items-center self-start mr-0 ml-auto border-b-3 border-[#4b7995] p-2">
          <h1 className=" text-[#4b7995] text-xl">سبد خرید</h1>
          <h1 className=" text-white text-xl rounded-lg bg-[#4b7995] px-1">
            {toPersianNumber(cartItems.length)}
          </h1>
        </div>
        {cartItems.map((item: BookType) => {
          const validItem = cartData.data.items.find(
            (q) => q.bookId === item.id,
          );
          if (!validItem) {
            return null;
          }
          const itemQuantity = validItem.quantity;
          const itemPriceDollar = item.price * itemQuantity;
          const itemPriceToman = dollarToToman(itemPriceDollar);

          return (
            <div key={item.id} className="flex flex-row gap-5 p-6 border-b-1 border-gray-300">
              <div className="flex flex-col gap-10 justify-center items-center">
                {
                  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                  <img
                    src={"/images/bookImage3.jpg"}
                    // src={item.cover_image}
                    className="w-20 object-cover"
                  />
                }
                {/* <div className="relative w-20 h-30">
                  <Image
                    src="/images/bookImage3.jpg"
                    fill
                    style={{ objectFit: "cover", borderRadius: 2 }}
                    alt="item image"
                  />
                </div> */}
                {/* quantity */}
                <div className="flex flex-row border-2 border-gray-300 rounded-lg gap-5 justify-center p-3">
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="text-sm"
                  >
                    {
                      <FaPlus className="text-xl text-red-400 hover:text-red-500 transition-all" />
                    }
                  </button>
                  <p className="text-md font-bold text-gray-500">
                    {itemQuantity || 1}
                  </p>
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="text-sm"
                  >
                    {itemQuantity !== 1 ? (
                      <FaMinus className="text-xl text-red-400 hover:text-red-500 transition-all" />
                    ) : (
                      <FaTrash className="text-xl text-red-400 hover:text-red-500 transition-all" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-gray-800 mb-3">
                  کتاب {item.title}
                </h1>
                <div className="flex flex-row gap-2">
                  <FiShield className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs" />
                  <p className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs">
                    گارانتی اصالت و سلامت فیزیکی کالا
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <FiBookOpen className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs" />
                  <p className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs">
                    {item.publisher}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <FiSend className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs" />
                  <p className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs">
                    ارسال پس جلد
                  </p>
                </div>
                <p className="font-bold mt-8 text-lg">{itemPriceToman} تومان</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* cart box */}
      <div className="flex flex-col p-8 lg:w-auto lg:min-w-80 md:w-auto md:min-w-80 w-full h-fit border-1 border-gray-300 rounded-xl shadow-md gap-8 lg:sticky md:sticky top-60">
        <div className="flex justify-between">
          <p className="font-bold text-gray-500 text-sm">
            قیمت کالاها {`(${cartItems.length})`}
          </p>
          <p className="font-bold text-gray-500 text-sm">
            {cartPriceToman} تومان
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-gray-700 text-sm">جمع سبد خرید</p>
          <p className="font-bold text-gray-700 text-sm">
            {cartPriceToman} تومان
          </p>
        </div>
        <button className="w-full h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all focus:bg-red-800">
          تایید و تکمیل سفارش
        </button>
      </div>
    </div>
  );
}
