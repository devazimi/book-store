import { getCart } from "@/app/actions/cart";
import CartPageComponent from "@/components/CartPage/CartPageComponent";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const cartData = await getCart();

  if (!cartData || !cartData?.data || !cartData?.data?.items) {
    redirect("/main");
  }

  console.log("cart data : ", cartData?.data);
  console.log("cart data2: ", cartData?.data.items);

  if (!cartData) {
    return <>no cart found</>;
  }

  const cartItemsWithBooks = await Promise.all(
    cartData?.data.items.map(async (item) => {
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

  return (
    <CartPageComponent cartItems={cartItemsWithBooks} cartData={cartData} />
  );
}
