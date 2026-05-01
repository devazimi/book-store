import { BookPageProps } from "@/types/propsType/type";

export default function BookPageComponent({ book }: BookPageProps) {
  const toPersianNumber = (input: number | string) => {
    return String(input).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const formatPrice = (input: number) => {
    const parts = input.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  const dollarToToman = (input: number) => {
    let tomanAmount = input * 180000;

    tomanAmount = Math.round(tomanAmount);

    const formatted = formatPrice(tomanAmount);

    const persianFormatted = toPersianNumber(formatted);

    return persianFormatted;
  };

  return (
    // <div className="w-full">
    <div className="flex flex-row h-full py-20 gap-10 justify-center items-center mx-auto border-box">
      <img src={"/images/bookImage.jpg"} className="w-65 object-cover" />
      <div className="flex flex-col justify-between p-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-xl">
            کتاب <span>{book.title}</span>
          </h1>
          <div className="flex flex-row gap-3">
            <p>نویسنده:</p>
            <p className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all">
              {book.author}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <p>انتشارات:</p>
            <p className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all">
              {book.publisher}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <p>نوع جلد:</p>
            <p className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all">
              {book.format}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <p>دسته بندی:</p>
            <div className="flex flex-row gap-1">
              {book.genres.map((genre) => (
                <p
                  key={genre.valueOf()}
                  className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all"
                >
                  {genre}،
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col mt-10 gap-3 w-120">
            <p>خلاصه داستان کتاب:</p>
            <p className="text-gray-500 hover:cursor-pointer flex-1 leading-7">
              {book.description}
            </p>
          </div>
        </div>
      </div>
      <div className="border-2 flex flex-col gap-15 p-5 bg-gray-100 rounded-xl">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col justify-center items-center bg-gray-200 p-2 rounded-md gap-2">
            <h6 className="text-gray-500 text-sm">سال انتشار</h6>
            <p className="text-gray-600 font-bold text-sm">
              {toPersianNumber(book.published_date.slice(0, 4))}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-200 p-2 rounded-md gap-2">
            <h6 className="text-gray-500 text-sm">تعداد صفحات</h6>
            <p className="text-gray-600 font-bold text-sm">
              {toPersianNumber(book.pages)}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-200 p-2 rounded-md gap-2">
            <h6 className="text-gray-500 text-sm">امتیاز</h6>
            <p className="text-gray-600 font-bold text-sm gap-1">
              <span>⭐</span>
              {toPersianNumber(book.rating)}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <h6 className="text-gray-600 text-lg">قیمت :</h6>
          <p className="text-gray-800 font-bold text-xl">
            {dollarToToman(book.price)} <span className="text-sm font-thin text-gray-700">تومان</span>
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
}
