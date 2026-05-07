"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function addToCart(bookId: string) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    throw new Error("لطفا اول وارد شوید");
  }

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

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_bookId: {
        cartId: cart.id,
        bookId: bookId,
      },
    },
  });

  if (cartItem) {
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + 1 },
    });
  }

  if (!cartItem) {
    await prisma.cartItem.create({
      data: { cartId: cart.id, bookId: bookId, quantity: 1 },
    });
  }

  return { success: true };
}
