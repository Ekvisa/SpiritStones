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
