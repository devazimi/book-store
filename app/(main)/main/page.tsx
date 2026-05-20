import MainPageComponent from "@/components/HomePage/MainPageComponent";

export async function generateMetadata() {
  return {
    title: "کتاب ها",
  };
}

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
    <div className="flex flex-col overflow-x-hidden">
      <header className="flex flex-col md:flex-row w-full max-w-screen h-100 bg-[#4b7995] my-5 justify-between items-center p4 md:p-10 gap-6 md:gap-10">
        <div className="flex flex-col w-full lg:w-1/3 md:w-1/2 justify-center gap-3 md:gap-5 p-4 md:p-5 rounded-sm text-center md:text-right">
          <h1 className="font-bold text-lg sm:text-2xl md:text-4xl text-white border-b-2 mx-auto md:mx-0">
            پَس‌جلد
          </h1>
          <h1 className=" text-lg sm:text-2xl text-white mx-auto md:mx-0">
            داستان از اینجا شروع می‌شود،
          </h1>
          <h1 className=" text-lg sm:text-2xl text-white mx-auto md:mx-0">
            آنجا که سکوت تمام می‌شود.
          </h1>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 h-64 md:h-80 lg:h-96 overflow-hidden p-2 rounded-lg">
          <img
            src="/images/bookImage2.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      </header>
      <MainPageComponent books={books} />
    </div>
  );
}
