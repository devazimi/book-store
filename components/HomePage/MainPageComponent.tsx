import { BookType } from "@/types/bookType/type";

export interface MainPageComponentProps{
    books: BookType[]
}

export default function MainPageComponent({books}: MainPageComponentProps){
    return (
        <div className="w-full max-w-[1200px] h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 my-10">
          <h1 className="font-bold text-xl mb-4">محبوت ترین های پس جلد</h1>
          <p className="text-md text-gray-500 mb-10">بهترین ها رو انتخاب کن</p>
          <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar scroll-smooth">
            <div
              className="flex flex-row w-max gap-4 w-400"
            >
              {books?.map((book: BookType) => {
                const publishedYear = book.published_date?.slice(0, 4) || "N/A";
    
                return (
                  <div
                    key={book.id}
                    className="group relative aspect-[3/4] flex-shrink-0 w-50 max-w-[280px] sm:max-w-none mx-auto 
                    rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                    transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {/* Book Cover Image */}
                    <img
                      src="/bookImage.jpg"
                      alt={`${book.title} cover`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
    
                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t 
                    from-black/80 via-black/20 to-transparent
                    group-hover:from-black/70 group-hover:via-black/30 
                    transition-all duration-300"
                    />
    
                    {/* Book Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <div
                        className="backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-4 
                      border border-white/20 group-hover:bg-white/20 
                      transition-all duration-300"
                      >
                        {/* Title */}
                        <h3
                          className="font-bold text-white text-sm sm:text-base 
                        truncate mb-2 leading-tight"
                          title={book.title}
                        >
                          {book.title}
                        </h3>
    
                        {/* Author and Year */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <p
                            className="text-xs sm:text-sm text-gray-200 truncate max-w-[120px]"
                            title={book.author}
                          >
                            {book.author}
                          </p>
                          <span className="text-gray-300 text-xs sm:text-sm">
                            •
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-white">
                            {publishedYear}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
    
          {/* Empty State */}
          {(!books || books.length === 0) && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm mt-1">Check back later for new additions</p>
            </div>
          )}
        </div>
      );
}