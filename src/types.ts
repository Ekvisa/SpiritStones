export type Stone = {
  id: string;
  name: string;
  class: string;
  image: string;
  description: string;
  emoji: string;
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

export type Order = {
  id: string;
  items: CartItem[];
  phrase: string;
};
