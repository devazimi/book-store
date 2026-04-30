import MainPageComponent from "@/components/HomePage/MainPageComponent";
import { BookType } from "@/types/bookType/type";

async function getBooks() {
  try {
    const baseUrl = process.env.base_url;
    const res = await fetch(`${baseUrl}/api/books`, {
      method: "GET",
      cache: "no-store",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error("Error fetching data @Home");
    }

    return response.data;
  } catch (err) {
    console.error("Error fetching data@", err);
  }
}

export default async function HomePage() {
  const books = await getBooks();

  return(
    <MainPageComponent books={books} />
  )
}
