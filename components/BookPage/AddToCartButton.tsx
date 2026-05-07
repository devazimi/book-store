"use client";

import { addToCart } from "@/app/actions/cart";

export function AddToCartButton({bookId}:{bookId: string}) {
    return(
        <button onClick={() => addToCart(bookId)} className="w-full h-12 text-white bg-blue-600 rounded-4xl hover:bg-green-800 hover:cursor-pointer transition-all">
            افزودن به سبد خرید    
        </button>
    )

}