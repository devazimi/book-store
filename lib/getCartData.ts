import { authOptions } from "./auth";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";

export async function getCartdata() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      throw new Error("کاربر وارد نشده است");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    });

    if (!cart) {
      throw new Error("سبد خرید ایجاد نشده است");
    }

    return cart;
  } catch (err) {
    console.error("خطا در دریافت اطلاعات: ", err);
    return null;
  }
}
