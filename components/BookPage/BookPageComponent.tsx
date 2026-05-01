import { BookPageProps } from "@/types/propsType/type";

export default function BookPageComponent({ book }: BookPageProps) {
  return (
    <div className="w-full px-40">
      <div className="flex flex-row w-screen h-full py-20 gap-10">
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
        <div></div>
      </div>
    </div>
  );
}
