export type Stone = {
  id: string;
  name: string;
  class: string;
  description: string;
  image: string;
};
export type StoneClass = {
  id: string;
  name: string;
  price: number;
  description: string;
};
export type Drink = {
  id: string;
  name: string;
  recommendation: { goal: string; stones: Array<string> };
};
export type CartItem = {
  id: string;
  stoneId?: string;
  classId: string;
  size: number;
  price: number;
};

export type CartProps = {
  cart: CartItem[];
  stones: Stone[];
  stoneClasses: StoneClass[];
  removeFromCart: (id: CartItem["id"]) => void;
  placeOrder: () => void;
};

export type Order = CartItem[];

export type OrderModalProps = {
  order: Order;
  onClose: () => void;
};
