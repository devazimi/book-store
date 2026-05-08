"use client";

import { decrementQuantity, incrementQuantity } from "@/app/actions/cart";
import { BookType } from "@/types/bookType/type";

export default function CartPageComponent({ cartItems, cartData }) {
  return (
    // container
    <div className="max-w-screen w-full flex mx-auto justify-center lg:flex-row md:flex-row sm:flex-col flex-col my-10">
      {/* items box */}
      <div className="flex flex-col gap-10">
        {cartItems.map((item: BookType) => {
          const validItem = cartData.data.items.find(
            (q) => q.bookId === item.id,
          );
          const itemQuantity = validItem.quantity;

          return (
            <div key={item.id} className="flex flex-row gap-5 border-1 p-7">
              <div className="flex flex-col gap-10 justify-center items-center">
                <img
                  src={"/images/bookImage3.jpg"}
                  className="object-cover w-20"
                />
                {/* quantity */}
                <div className="flex flex-row border-2 border-gray-300 rounded-lg gap-5 justify-center p-3">
                  <button onClick={() => incrementQuantity(item.id)} className="text-sm">➕</button>
                  <p className="text-sm">{itemQuantity || 1}</p>
                  <button onClick={() => decrementQuantity(item.id)} className="text-sm">🗑️</button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-gray-800 mb-3">کتاب {item.title}</h1>
                <p className="text-gray-500 text-xs ">
                  🛡️ گارانتی اصالت و سلامت فیزیکی کالا
                </p>
                <p className="text-gray-500 text-xs ">📚 {item.publisher}</p>
                <p className="text-gray-500 text-xs ">🚚 ارسال پس جلد</p>
                <p className="text-gray-500 text-xl ">{item.price} تومان</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
