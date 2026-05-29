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

export interface MainPageComponentProps {
  books: BookType[];
}

export interface CartDataItems {
  id: string;
  cartId: string;
  bookId: string;
  quantity: number;
  itemPrice: number;
}

export interface CartPageProps {
  cartItems: BookType[];
  cartData: {
    data: {
      items: CartDataItems[];
      cartPrice: number;
    } | null;
  } | null;
}

export interface NavbarProps {
  data: {
    cart: {
      items: CartDataItems[];
    } | null;
    session: {
      user: userSession;
    } | null;
  } | null;
}

export interface ProfileProps {
  user: userSession | undefined;
}

export interface CheckoutPageProps {
  cartItems: BookType[];
  cart: {
    data: {
      id: string;
      items: CartDataItems[];
      cartPrice: number;
    } | null;
  } | null;
}

export interface OrderType {
  id: string;
  totalPrice: number;
  status: string;
  address: string;
  createdAt: string;
}

export interface OrdersPageProps {
  user: userSession;
  orders: OrderType[];
}
