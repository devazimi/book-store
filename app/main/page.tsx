import MainPageComponent from "@/components/HomePage/MainPageComponent";

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

  return (
    <div className="flex flex-col">
      <header className="flex flex-row w-full h-100 bg-[#4b7995] my-5 justify-between items-center p-10">
        <div className="flex flex-col w-1/3 justify-center mx-auto gap-5 p-5 rounded-sm">
          <h1 className="font-bold text-4xl text-white border-b-2">پَس‌جلد</h1>
          <h1 className=" text-3xl text-white">داستان از اینجا شروع می‌شود،</h1>
          <h1 className=" text-2xl text-white">آنجا که سکوت تمام می‌شود.</h1>
        </div>
        <img
          src="/images/bookImage2.jpg"
          alt=""
          className="object-cover w-2/3 h-full"
        />
      </header>
      <MainPageComponent books={books} />
    </div>
  );
}
