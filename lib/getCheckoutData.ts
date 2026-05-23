import { getCart } from "@/app/actions/cart";

export async function getCheckoutData() {
  try {
    const cart = await getCart();

    if (!cart) {
      throw new Error("اطلاعات سبد خرید برای پرداخت موجود نمی باشد");
    }

    const cartItems = await Promise.all(
      cart.data.items.map(async (item) => {
        try {
          const baseUrl = process.env.base_url;  
          const res = await fetch(`${baseUrl}/api/books/${item.bookId}`);
          if (!res.ok) {
            throw new Error("اطلاعات کتاب برای پرداخت موجود نمی باشد");
          }
          const data = await res.json();

          return data;
          // setCartDataWithItems(data);
          // setLoading(false);
        } catch (err) {
          console.error("error fetching items at checkout: ", err);
        }
      }),
    );

    return { cartItems, cart };
  } catch (err) {
    console.error("error fetching cart at checkout: ", err);
  }
}
