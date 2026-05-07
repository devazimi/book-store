export interface BookType {
  id: string;
  title: string;
  slug: string;
  author: string;
  isbn: string;
  description: string;
  publisher: string;
  published_date: string;
  pages: number;
  language: string;
  genres: [string];
  rating: number;
  price: number;
  inventory_count: number;
  format: string;
  cover_image: string;
  tags: [string];
  is_bestseller: boolean;
}

// {
//     "id": 1,
//     "title": "The Little Prince",
//     "slug": "the-little-prince",
//     "author": "Antoine de Saint-Exupéry",
//     "isbn": "978-0-15-601219-5",
//     "description": "A pilot stranded in the desert meets a young prince fallen to Earth from a tiny asteroid. Through the prince's travels across various planets, the story explores themes of loneliness, friendship, love, and loss. One of the most translated books in history.",
//     "publisher": "Harvest Books",
//     "published_date": "1943-04-06",
//     "pages": 96,
//     "language": "English",
//     "genres": ["Fiction", "Philosophy", "Classic", "Children"],
//     "rating": 4.8,
//     "price": 11.99,
//     "inventory_count": 25,
//     "format": "Paperback",
//     "cover_image": "https://covers.openlibrary.org/b/isbn/978-0-15-601219-5-M.jpg",
//     "tags": ["bestseller", "classic", "philosophy"],
//     "is_bestseller": true
//   },
