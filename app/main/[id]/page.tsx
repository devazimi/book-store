import BookPageComponent from "@/components/BookPage/BookPageComponent";
import { Params } from "@/types/propsType/type";

export default async function BookPage({ params }: Params) {
  let book;
  try {
    const baseUrl = process.env.base_url;
    const { id } = await params;

    console.log("📌 Base URL:", baseUrl);
    console.log("📌 Book ID:", id);
    console.log("📌 Full URL:", `${baseUrl}/api/books/${id}`);

    const res = await fetch(`${baseUrl}/api/books/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("fetching failed");
    }

    book = await res.json();
  } catch (err) {
    console.log("error: ", err);
    throw new Error("something went wrong");
  }

  return <BookPageComponent book={book} />;
}
