"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToOrder(cartId: string, address: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
  });

  if (!cart) {
    redirect("/main");
  }

  await prisma.order.create({
    data: {
      userId: session.user.id,
      totalPrice: cart.cartPrice,
      address: address,
    },
  });

  await prisma.cart.delete({
    where: { id: cartId },
  });

  revalidatePath("/orders");
}

export async function getOrders() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    // where: { userId: session.user.id },
    where: { userId: session.user.id },
  });

  if (!orders) {
    redirect("/main");
  }

  return orders.map((order) => ({
    ...order,
    createdAt: order.createdAt.toString(),
  }));
}

export async function deleteOrder(orderId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    redirect("/main");
  }

  await prisma.order.delete({
    where: { id: order.id },
  });

  revalidatePath("/orders");
}
