"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function addToOrder(cartId: string, address: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("there is no user");
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!cart) {
      throw new Error("no cart found");
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalPrice: cart.cartPrice,
        address: address,
      },
    });

    return order;
  } catch (err) {
    console.error("no order found: ", err);
    return err;
  }
}

export async function getOrder() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      throw new Error("there is no user");
    }

    const order = await prisma.order.findUnique({
      where: { userId: session.user.id },
    });

    if (!order) {
      throw new Error("no order found");
    }

    return order;
  } catch (err) {
    console.error("error getting order: ", err);
    return err;
  }
}
