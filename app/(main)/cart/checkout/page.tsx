import CheckoutPageComponent from "@/components/CheckoutPage/CheckoutPageComponent";
import { getCheckoutData } from "@/lib/getCheckoutData";

export default async function CheckoutPage(){
    const checkoutData = await getCheckoutData();

    return(
        <CheckoutPageComponent cart={checkoutData?.cart} cartItems={checkoutData?.cartItems} />
    )
}