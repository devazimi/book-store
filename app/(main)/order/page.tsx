import { getOrder } from "@/app/actions/order";
import OrderPageComponent from "@/components/OrderPage/OrderPageComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return "no user";
  }

  const order = await getOrder();

  const user = session.user;

  console.log("order: ", order);
  return <OrderPageComponent user={user} order={order} />;
}
