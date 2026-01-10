import React, { useState } from "react";
import { CartItem, Stone, StoneClass } from "../../types";

import "./Cart.css";

type CartProps = {
  cart: CartItem[];
  stones: Stone[];
  stoneClasses: StoneClass[];
  removeFromCart: (id: CartItem["id"]) => void;
};

function Cart({ cart, stones, stoneClasses, removeFromCart }: CartProps) {
  return (
    <section id="cart">
      <h3>Наборы в корзине:</h3>

      {cart.length === 0 && <p>Корзина пуста</p>}

      <ul>
        {cart.map((item) => {
          const stone = stones.find((s) => s.id === item.stoneId);
          const stoneClass = stoneClasses.find((c) => c.id === item.classId);

          return (
            <li key={item.id}>
              {stone ? stone.name : stoneClass?.name}, {item.size} шт.:{" "}
              {item.price} ю.
              <button onClick={() => removeFromCart(item.id)}>✕</button>
            </li>
          );
        })}
      </ul>

      <p>
        <strong>Всего: {cart.reduce((sum, i) => sum + i.price, 0)} ю.</strong>
      </p>
    </section>
  );
}

export default Cart;
