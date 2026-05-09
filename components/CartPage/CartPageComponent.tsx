"use client";

import { decrementQuantity, incrementQuantity } from "@/app/actions/cart";
import { useLogic } from "@/hooks/useLogic";
import { BookType } from "@/types/bookType/type";

export default function CartPageComponent({ cartItems, cartData }) {
  const {dollarToToman} = useLogic();

  const cartPriceDollar = cartItems?.reduce(
    (sum: number, item: BookType) => sum + item.price,
    0,
  );
  
  const cartPriceToman = dollarToToman(cartPriceDollar);

  return (
    // container
    <div className="max-w-screen w-[1200px] flex mx-auto justify-between lg:flex-row md:flex-row sm:flex-col flex-col m-10">
      {/* items box */}
      <div className="flex flex-col gap-10 justify-center items-center">
        {cartItems.map((item: BookType) => {
          const validItem = cartData.data.items.find(
            (q) => q.bookId === item.id,
          );
          const itemQuantity = validItem.quantity;

          const priceToToman = dollarToToman(item.price)

          return (
            <div key={item.id} className="flex flex-row gap-5 border-1 p-6">
              <div className="flex flex-col gap-10 justify-center items-center">
                <img
                  src={"/images/bookImage3.jpg"}
                  className="object-cover w-20"
                />
                {/* quantity */}
                <div className="flex flex-row border-2 border-gray-300 rounded-lg gap-5 justify-center p-3">
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="text-sm"
                  >
                    ➕
                  </button>
                  <p className="text-sm">{itemQuantity || 1}</p>
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-gray-800 mb-3">
                  کتاب {item.title}
                </h1>
                <p className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs">
                  🛡️ گارانتی اصالت و سلامت فیزیکی کالا
                </p>
                <p className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs">
                  📚 {item.publisher}
                </p>
                <p className="text-gray-500 text-[11px] sm:text-xs md:text-xs lg:text-xs xl:text-xs">
                  🚚 ارسال پس جلد
                </p>
                <p className="font-bold mt-8 text-lg">{priceToToman} تومان</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* cart box */}
      <div className="border flex flex-col p-5 mx-10 w-70 gap-8">
        <div className="flex justify-between">
          <p className="font-bold text-gray-500 text-sm">
            قیمت کالاها {`(${cartItems.length})`}
          </p>
          <p className="font-bold text-gray-500 text-sm">{cartPriceToman} تومان</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-gray-700 text-sm">جمع سبد خرید</p>
          <p className="font-bold text-gray-700 text-sm">{cartPriceToman} تومان</p>
        </div>
        <button className="w-full h-12 bg-red-600 text-white rounded-lg">
          تایید و تکمیل سفارش
        </button>
      </div>
    </div>
  );
}
