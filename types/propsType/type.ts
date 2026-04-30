import { BookType } from "../bookType/type";

export interface Params {
  params: Promise<{ id: string }>;
}

export interface BookPageProps{
    book: BookType;
}