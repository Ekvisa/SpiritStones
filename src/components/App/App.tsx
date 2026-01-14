import React, { JSX, ReactNode, useEffect, useState } from "react";
import Start from "../Start/Start";
import About from "../About/About";
import Catalog from "../Catalog/Catalog";
import FAQ from "../FAQ/FAQ";
import Cart from "../Cart/Cart";
import Modal from "../Modal/Modal";
import Orders from "../Orders/Orders";
import "./App.css";

import { Stone, StoneClass, Drink, CartItem } from "../../types";

function App() {
  const [stones, setStones] = useState<Stone[]>([]);
  const [stoneClasses, setStoneClasses] = useState<StoneClass[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);

  const placeOrder = () => {
    if (cart.length === 0) return;
    setLastOrder(cart);
    setCart([]);
    setModalOpen(true);
  };

  const PATH = "https://spiritstones.onrender.com";
  //"http://localhost:3001";
  //

  useEffect(() => {
    fetch(`${PATH}/stones`)
      .then((r) => r.json())
      .then(setStones);

    fetch(`${PATH}/stoneClasses`)
      .then((r) => r.json())
      .then(setStoneClasses);

    fetch(`${PATH}/drinks`)
      .then((res) => res.json())
      .then((data) => setDrinks(data));
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  function getRandomEmoji(stoneClass: string): string {
    const filteredStones: Stone[] = stones.filter(
      (s) => s.class === stoneClass && s.emoji
    );
    if (filteredStones.length === 0) {
      return "🌚";
    }
    const randomFilteredStone =
      filteredStones[Math.floor(Math.random() * filteredStones.length)];
    return randomFilteredStone.emoji;
  }

  function getCartItemImage(cartItem: CartItem): JSX.Element {
    const emojisSet: string[] = [];

    if (cartItem.stoneId) {
      console.log(cartItem.stoneId);
      const stone = stones.find((s) => s.id === cartItem.stoneId);
      console.log(stone);
      const emoji = stone?.emoji || "◼️";
      console.log(stone?.emoji);
      for (let i = 0; i < cartItem.size; i++) {
        emojisSet.push(emoji);
      }
    } else {
      for (let i = 0; i < cartItem.size; i++) {
        emojisSet.push(getRandomEmoji(cartItem.classId));
      }
    }

    return <p>{emojisSet}</p>;
  }

  function getOrderImage(order: CartItem[]): JSX.Element {
    return (
      <div className="orderImage">
        {order.map((item) => getCartItemImage(item))}
      </div>
    );
  }

  return (
    <>
      <Start />
      <About />
      <FAQ />
      <Catalog
        drinks={drinks}
        stones={stones}
        stoneClasses={stoneClasses}
        addToCart={addToCart}
      />

      <Cart
        cart={cart}
        stones={stones}
        stoneClasses={stoneClasses}
        removeFromCart={removeFromCart}
        placeOrder={placeOrder}
      />
      {isModalOpen && (
        <Modal
          order={lastOrder}
          getOrderImage={() => getOrderImage(lastOrder)}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
