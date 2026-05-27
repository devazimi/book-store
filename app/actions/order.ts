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

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      totalPrice: cart.cartPrice,
      address: address,
    },
  });

  revalidatePath("/order");
  return order;
}

export async function getOrder() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/login");
  }

  const order = await prisma.order.findUnique({
    where: { userId: session.user.id },
  });

  if (!order) {
    redirect("/main");
  }

  return {
    ...order,
    createdAt: order.createdAt.toString(),
  };
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

  revalidatePath("/order");
  redirect("/main");
}
