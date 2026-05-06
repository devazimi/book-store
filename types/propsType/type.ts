import { BookType } from "../bookType/type";

export interface Params {
  params: Promise<{ id: string }>;
}

interface userSession {
  id: string;
  email: string;
  username: string;
}

export interface BookPageProps {
  book: BookType;
  user: userSession | undefined;
}