"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function addToCart(bookId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("لطفا اول وارد شوید");
    }

    console.log(session?.user?.id);

    let cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    }

    let cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_bookId: {
          cartId: cart.id,
          bookId: bookId,
        },
      },
    });

    if (cartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + 1 },
      });
    }

    if (!cartItem) {
      cartItem = await prisma.cartItem.create({
        data: { cartId: cart.id, bookId: bookId, quantity: 1 },
      });
    }

    revalidatePath(`/main/${bookId}`);
    return { success: true };
  } catch (err) {
    console.log("خطا در افزودن به سبد خرید: ", err);
    console.error("error add to cart: ", err);
  }
}

export async function getCart() {
  try {
    const session = await getServerSession(authOptions);

    console.log(session?.user.id);

    const cart = await prisma.cart.findUnique({
      where: { userId: session?.user.id },
    });

    if (!cart) {
      throw new Error("سبد خرید ایجاد نشده است");
    }

    return { success: true, data: cart };
  } catch (err) {
    console.log("خطا در دریافت سبد خرید: ", err);
    console.error("get cart err: ", err);
  }
}
