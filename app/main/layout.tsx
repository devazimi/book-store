// types/bookType/genres.ts
export type GenreType = {
  id: number;
  name_fa: string;
  name_en: string;
  icon?: string;
};

export const genres: GenreType[] = [
  { id: 1, name_fa: "رمان", name_en: "Novel" },
  { id: 2, name_fa: "داستان کوتاه", name_en: "Short Story" },
  { id: 3, name_fa: "شعر", name_en: "Poetry" },
  { id: 4, name_fa: "تاریخی", name_en: "Historical" },
  { id: 5, name_fa: "علمی تخیلی", name_en: "Sci-Fi" },
  { id: 6, name_fa: "فانتزی", name_en: "Fantasy" },
  { id: 7, name_fa: "رازآلود", name_en: "Mystery" },
  { id: 8, name_fa: "هیجان انگیز", name_en: "Thriller" },
  { id: 9, name_fa: "عاشقانه", name_en: "Romance" },
  { id: 10, name_fa: "ترسناک", name_en: "Horror" },
  { id: 11, name_fa: "بیوگرافی", name_en: "Biography" },
  { id: 12, name_fa: "خودسازی", name_en: "Self-Help" },
  { id: 13, name_fa: "فلسفه", name_en: "Philosophy" },
  { id: 14, name_fa: "روانشناسی", name_en: "Psychology" },
  { id: 15, name_fa: "کودکان", name_en: "Children" },
  { id: 16, name_fa: "آشپزی", name_en: "Cooking" },
  { id: 17, name_fa: "سفرنامه", name_en: "Travel" },
  { id: 18, name_fa: "کمیک", name_en: "Comic" },
  { id: 19, name_fa: "درام", name_en: "Drama" },
  { id: 20, name_fa: "ادبیات کلاسیک", name_en: "Classic" },
];

// components/HomePageLayout.tsx
export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* <header className="flex flex-row w-full h-100 bg-[#4b7995] my-5 justify-between items-center p-10">
              <div className="flex flex-col w-1/3 justify-center mx-auto gap-5 p-5 rounded-sm">
                <h1 className="font-bold text-4xl text-white border-b-2">پَس‌جلد</h1>
                <h1 className=" text-3xl text-white">
                  داستان از اینجا شروع می‌شود،
                </h1>
                <h1 className=" text-2xl text-white">
                  آنجا که سکوت تمام می‌شود.
                </h1>
              </div>
              <img
                src="/images/bookImage2.jpg"
                alt=""
                className="object-cover w-2/3 h-full"
              />
            </header> */}

          {/* Main Content Area */}
          <main className="flex-1 px-4 md:px-6 lg:px-8 pb-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              {children}
            </div>
          </main>

          {/* Optional Footer */}
          <footer className="w-full py-4 px-6 border-t border-gray-200 bg-white">
            <p className="text-center text-gray-600 text-sm"></p>
          </footer>
        </div>
      </div>
    </div>
  );
}
