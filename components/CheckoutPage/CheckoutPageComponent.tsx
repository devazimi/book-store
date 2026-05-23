"use client";

import { useLogic } from "@/hooks/useLogic";
import { BookType } from "@/types/bookType/type";
import { CheckoutPageProps } from "@/types/propsType/type";
import { useState } from "react";

import { BsBack } from "react-icons/bs";
import { FaBookOpen, FaMapMarkerAlt, FaTruck } from "react-icons/fa";

const days = [
  { id: 1, day: "شنبه", price: "36,000" },
  { id: 2, day: "یکشنبه", price: "36,000" },
  { id: 3, day: "دوشنبه", price: "36,000" },
  { id: 4, day: "سه شنبه", price: "36,000" },
  { id: 5, day: "چهارشنبه", price: "36,000" },
  { id: 6, day: "پنجشنبه", price: "36,000" },
  { id: 7, day: "جمعه", price: "76,000" },
];

export default function CheckoutPageComponent({ cartItems, cart }: CheckoutPageProps) {
  const [address, setAddress] = useState('');
  const [confirmAddress, setConfirmAddress] = useState('')
  const [typingAddress, setTypingAddress] = useState(false);

  const { dollarToToman } = useLogic();

  // checkout price
  const cartPrice = cartItems.reduce((sum: number, item: BookType) => {
    const currentItem = cart.data.items.find(
      (book) => book.bookId === item.id,
    );
    if (!currentItem) {
      return sum;
    }
    const itemPrice = item.price * currentItem.quantity;
    return (sum += itemPrice);
  }, 0);

  const checkoutPriceToman = dollarToToman(cartPrice);

  // checkout items length
  const checkoutItemsLength = cartItems.reduce((sum, item)=> {
    const currentItem = cart.data.items.find(book => book.bookId === item.id);
    if(!currentItem){
      return sum;
    }
    const itemLength = currentItem.quantity;
    return sum += itemLength;
  },0)
  
  console.log('itemsLength: ', checkoutItemsLength)
  console.log("cartPrice: ", cartPrice);
  console.log("cart data with items: ", cartItems);
  console.log("cartItems: ", cart.data.items);

  return (
    // container
    <div className="flex flex-col max-w-screen w-[1200px] mx-auto items-center justify-center overflow-x-hidden gap-5 p-2">
      {/* header */}
      <div className="flex flex-row w-full items-center py-3 px-3 md:px-7 border-2 rounded-lg border-gray-200 justify-between mx-3 md:mx-none">
        <div className="flex gap-5">
          <BsBack className="font-bold text-md md:text-lg text-gray-700" />
          <h1 className="text-sm md:text-lg text-gray-700">
            آدرس و زمان ارسال
          </h1>
        </div>
        <div className="flex gap-5">
          <FaBookOpen className="animate-[fadeIn_1.5s_ease-out] text-[#4b7995] text-md md:text-2xl" />
          <h1 className="animate-[fadeIn_1.5s_ease-out] text-md md:text-xl font-bold text-[#4b7995]">
            پَسجلد
          </h1>
        </div>
      </div>
      {/* main */}
      <div className="flex flex-col md:flex-row w-full justify-center-items-center gap-4">
        {/* info */}
        <div className="flex flex-col md:w-[900px] border-1 border-gray-200 rounded-md p-4 gap-10">
          {/* address */}
          <div className="border-2 border-gray-200 rounded-md p-4">
            <div className="flex flex-row justify-between px-2 gap-3 text-sm text-blue-500">
              <p className="text-sm text-blue-500">ارسال به آدرس انتخاب شده</p>
              <FaMapMarkerAlt />
            </div>
            {!typingAddress && address !== "" ? (
              <div
                className="flex items-center border-1 border-gray-300 bg-gray-200 h-12 rounded-sm p-3 text-xs w-150 mt-5"
                onClick={() => {
                  setTypingAddress(true);
                }}
              >
                <p>{confirmAddress}</p>
              </div>
            ) : (
              <div className="flex w-full justify-center items-center gap-3 mt-5">
                <input
                  type="text"
                  placeholder="آدرس محل سکونت خود را بنویسید..."
                  className="border-1 border-gray-300 h-12 rounded-sm p-3 text-xs w-150 "
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setTypingAddress(true);
                  }}
                />
                {address !== "" && (
                  <button
                    className="w-42 h-12 bg-green-700 text-white rounded-md p-1"
                    onClick={() => {
                      setConfirmAddress(address);
                      setTypingAddress(false);
                    }}
                  >
                    تایید آدرس
                  </button>
                )}
              </div>
            )}
          </div>
          {/* date */}
          <div className="border-2 border-gray-200 rounded-md p-4">
            <div className="flex flex-row justify-between px-2 gap-3 text-sm text-blue-500">
              <p className="text-sm text-blue-500">انتخاب و تعیین زمان ارسال</p>
              <FaTruck />
            </div>
            <div className="flex gap-3 mt-5">
              {days.map((d: { id: number; day: string; price: string }) => (
                <div
                  key={d.id}
                  className="flex flex-col w-20 h-25 justify-center items-center border-2 border-gray-300 rounded-sm gap-4"
                >
                  <p className="font-bold text-md text-gray-700">{d.day}</p>
                  <p>{d.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* cart box */}
        <div className="flex flex-col p-8 lg:w-auto lg:min-w-80 md:w-auto md:min-w-80 w-full h-fit border-1 border-gray-200 rounded-xl gap-8 lg:sticky md:sticky ">
          <div className="flex justify-between">
            <p className="font-bold text-gray-500 text-sm">
              قیمت کالاها {`(${checkoutItemsLength})`}
            </p>
            <p className="font-bold text-gray-500 text-sm">
              {checkoutPriceToman} تومان
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-gray-700 text-sm">مبلغ قابل پرداخت</p>
            <p className="font-bold text-gray-700 text-sm">
              {checkoutPriceToman} تومان
            </p>
          </div>
          <button className="w-full h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all focus:bg-red-800">
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
