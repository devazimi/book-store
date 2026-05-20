// import { getCart } from "../actions/cart";
import { getCart } from "@/app/actions/cart";
import CartPageComponent from "@/components/CartPage/CartPageComponent";

export default async function getCartData() {
  const cartData = await getCart();

  console.log("cart data : ", cartData?.data);
  console.log("cart data2: ", cartData?.data.items);

  if (!cartData) {
    return <>no cart found</>;
  }

  const cartItemsWithBooks = await Promise.all(
    cartData.data.items.map(async (item) => {
      try {
        const baseUrl = process.env.base_url;
        const res = await fetch(`${baseUrl}/api/books/${item.bookId}`);
        const book = await res.json();
        if (!res) {
          throw new Error("book not found");
        }
        return book;
      } catch (err) {
        console.error("error fetching book: ", err);
      }
    }),
  );

  console.log("cart items: ", cartItemsWithBooks);
  console.log('quantity: ', cartData.data.items.map(q => q.quantity))

  return (
    <CartPageComponent cartItems={cartItemsWithBooks} cartData={cartData} />
  );
}
