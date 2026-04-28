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
  { id: 20, name_fa: "ادبیات کلاسیک", name_en: "Classic" }
];

// components/HomePageLayout.tsx
export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar */}
          <aside className="w-full md:w-64 lg:w-72 bg-white shadow-md p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <h1 className="text-xl font-bold text-gray-800 mb-4 md:mb-6 pb-2 border-b-2 border-blue-500">
              GENRES
            </h1>
            <nav className="space-y-1 md:space-y-2 max-h-[60vh] md:max-h-[80vh] overflow-y-auto">
              {genres.map((item: GenreType) => (
                <div
                  key={item.id}
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors duration-200 group"
                >
                  <span className="text-gray-700 group-hover:text-blue-600 text-sm md:text-base">
                    {item.name_en}
                  </span>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <header className="w-full py-6 md:py-8 px-4 md:px-6">
              <div className="flex items-center justify-center">
                <h1 className="text-gray-800 font-black text-center
                  text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                  leading-tight tracking-tight">
                  What Do You Want To Read?
                </h1>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 px-4 md:px-6 lg:px-8 pb-8">
              <div className="flex items-center justify-center min-h-[60vh]">
                {children}
              </div>
            </main>

            {/* Optional Footer */}
            <footer className="w-full py-4 px-6 border-t border-gray-200 bg-white">
              <p className="text-center text-gray-600 text-sm">
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}