import { getCart } from "@/app/actions/cart";

export async function getCheckoutData() {
  try {
    const cart = await getCart();

    if (!cart || !cart.data) {
      return { cart: null, cartItems: [] };
    }

    const cartItems = await Promise.all(
      cart.data.items.map(async (item) => {
        try {
          const baseUrl = process.env.base_url;
          const res = await fetch(`${baseUrl}/api/books/${item.bookId}`);
          if (!res.ok) {
            console.error("book not found: ", item.bookId);
            return null;
          }
          const data = await res.json();

          return data;
        } catch (err) {
          console.error("error fetching items at checkout: ", err);
          return null;
        }
      }),
    );

    const validCartItems = cartItems.filter((item) => item.id !== null);

    return { cart, cartItems: validCartItems };
  } catch (err) {
    console.error("error fetching cart at checkout: ", err);
    return { cart: null, cartItems: [] };
  }
}
