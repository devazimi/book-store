import { getOrder } from "@/app/actions/order";
import OrderPageComponent from "@/components/OrderPage/OrderPageComponent";
import { useLogic } from "@/hooks/useLogic";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return "no user";
  }

  const order = await getOrder();

  const user = session.user;

  if (!order) {
    return <div>no order</div>;
  }

  console.log("order: ", order);
  return <OrderPageComponent user={user} order={order} />;
}
