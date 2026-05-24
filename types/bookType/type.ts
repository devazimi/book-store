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
