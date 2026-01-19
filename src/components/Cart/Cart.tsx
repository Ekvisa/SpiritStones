import { CartItem, Stone, StoneClass } from "../../types";

import "./Cart.css";

type CartProps = {
  cart: CartItem[];
  stones: Stone[];
  stoneClasses: StoneClass[];
  removeFromCart: (id: CartItem["id"]) => void;
  placeOrder: () => void;
};

function Cart({
  cart,
  stones,
  stoneClasses,
  removeFromCart,
  placeOrder,
}: CartProps) {
  return (
    <section id="cart" className="dark">
      <div className="content wrapper">
        <h2>Корзина</h2>

        {cart.length === 0 && <p>Корзина пуста</p>}

        <ul>
          {cart.map((item) => {
            const stone = stones.find((s) => s.id === item.stoneId);
            const stoneClass = stoneClasses.find((c) => c.id === item.classId);

            return (
              <li key={item.id}>
                {stone ? stone.name : stoneClass?.name}, {item.size} шт.:{" "}
                {item.price} &curren;
                <button onClick={() => removeFromCart(item.id)}>✕</button>
              </li>
            );
          })}
        </ul>

        <p>
          <strong>
            Всего: {cart.reduce((sum, i) => sum + i.price, 0)} &curren;
          </strong>
        </p>
        <button type="button" onClick={placeOrder} disabled={cart.length === 0}>
          Сделать заказ
        </button>
      </div>
    </section>
  );
}

export default Cart;
