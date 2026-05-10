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

interface CartDataItems {
  id: string;
  cartId: string;
  bookId: string;
  quantity: number;
}

export interface CartPageProps {
  cartItems: BookType[];
  cartData: {
    data: {
      items: CartDataItems[];
    };
  };
}
