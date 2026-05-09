import { BookPageProps } from "@/types/propsType/type";
import { AddToCartButton } from "./AddToCartButton";
import { useLogic } from "@/hooks/useLogic";

export default function BookPageComponent({ book, user }: BookPageProps) {
  const { dollarToToman, toPersianNumber } = useLogic();

  const priceToToman = dollarToToman(book.price);

  return (
    <div className="flex flex-wrap w-full max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-6 gap-6 md:gap-10">
      <div className="flex flex-row gap-4 md:gap-10 flex-1 min-w-0">
        <div className="flex-shrink-0">
          <img
            src={"/images/bookImage.jpg"}
            className="w-28 sm:w-36 md:w-52 lg:w-65 object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-between min-w-0 flex-1">
          <div className="flex flex-col gap-3 md:gap-4">
            <h1 className="font-bold text-base sm:text-lg md:text-xl">
              کتاب <span>{book.title}</span>
            </h1>
            <div className="flex flex-row gap-2 md:gap-3">
              <p className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                نویسنده:
              </p>
              <p className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all text-xs sm:text-sm md:text-base truncate">
                {book.author}
              </p>
            </div>
            <div className="flex flex-row gap-2 md:gap-3">
              <p className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                انتشارات:
              </p>
              <p className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all text-xs sm:text-sm md:text-base truncate">
                {book.publisher}
              </p>
            </div>
            <div className="flex flex-row gap-2 md:gap-3">
              <p className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                نوع جلد:
              </p>
              <p className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all text-xs sm:text-sm md:text-base truncate">
                {book.format}
              </p>
            </div>
            <div className="flex flex-row gap-2 md:gap-3">
              <p className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                دسته بندی:
              </p>
              <div className="flex flex-row flex-wrap gap-1">
                {book.genres.map((genre) => (
                  <p
                    key={genre.valueOf()}
                    className="text-blue-800 hover:cursor-pointer hover:text-blue-500 transition-all text-xs sm:text-sm md:text-base"
                  >
                    {genre}،
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-10">
            <div className="flex flex-col gap-2 md:gap-3">
              <p className="text-xs sm:text-sm md:text-base">
                خلاصه داستان کتاب:
              </p>
              <p className="text-gray-500 hover:cursor-pointer leading-6 md:leading-7 text-xs sm:text-sm md:text-base text-wrap">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-15 p-6 md:p-10 bg-white rounded-xl w-full md:w-80 lg:w-96 h-fit">
        <div className="flex flex-row gap-3 md:gap-5">
          <div className="flex flex-col justify-center items-center border p-2 rounded-xl gap-2 flex-1 min-w-[80px]">
            <h6 className="text-gray-500 text-xs md:text-sm">سال انتشار</h6>
            <p className="text-gray-600 font-bold text-xs md:text-sm">
              {toPersianNumber(book.published_date.slice(0, 4))}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center border p-2 rounded-xl gap-2 flex-1 min-w-[80px]">
            <h6 className="text-gray-500 text-xs text-center md:text-sm">
              تعداد صفحات
            </h6>
            <p className="text-gray-600 font-bold text-xs md:text-sm">
              {toPersianNumber(book.pages)}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center border p-2 rounded-xl gap-2 flex-1 min-w-[80px]">
            <h6 className="text-gray-500 text-xs md:text-sm">امتیاز</h6>
            <p className="text-gray-600 font-bold text-xs md:text-sm gap-1">
              <span>⭐</span>
              {toPersianNumber(book.rating)}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <h6 className="text-gray-600 text-base md:text-lg">قیمت :</h6>
          <p className="text-gray-800 font-bold text-lg md:text-xl">
            {priceToToman}{" "}
            <span className="text-sm font-thin text-gray-700">تومان</span>
          </p>
        </div>
        <AddToCartButton bookId={book.id} />
      </div>
    </div>
  );
}
