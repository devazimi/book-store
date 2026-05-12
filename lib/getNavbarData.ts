import { authOptions } from "./auth";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";

export async function getNavbardata() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return null;
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
      return null;
    }

    return {cart, session};
  } catch (err) {
    console.error("خطا در دریافت اطلاعات: ", err);
    return null;
  }
}
