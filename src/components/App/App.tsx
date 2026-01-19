import React, { JSX, ReactNode, useEffect, useState } from "react";
import Start from "../Start/Start";
import About from "../About/About";
import Catalog from "../Catalog/Catalog";
import FAQ from "../FAQ/FAQ";
import Cart from "../Cart/Cart";
import Modal from "../Modal/Modal";
import Orders from "../Orders/Orders";
import "./App.css";

import { Stone, StoneClass, Drink, CartItem, Order } from "../../types";

function App() {
  const [stones, setStones] = useState<Stone[]>([]);
  const [stoneClasses, setStoneClasses] = useState<StoneClass[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);

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

  const phrases = [
    "Камни не спешат и всё равно доходят до своего места",
    "Природа не объясняет себя. Она просто работает.",
    "Пусть в этом сочетании будет равновесие.",
    "Даже самый простой камень — результат долгого пути",
    "Надёжность не обязана быть громкой",
    "Иногда устойчивость — это самый редкий ресурс",
    "То, что кажется неподвижным, просто движется очень медленно",
    "Прочность — это история, рассказанная без слов",
    "Сила — это не напряжение, а умение оставаться собой",
    "Твёрдость не противоречит спокойствию",
    "Вечность складывается из множества мгновений",
    "Устойчивость — это тихая форма силы",
    "Даже самые прочные вещи когда-то были мягкими",
    "Форма появляется там, где есть терпение",
    "Камень помнит больше, чем может рассказать",
    "То, что кажется простым, часто результат долгой работы",
    "Иногда достаточно не сдвигаться, чтобы всё вокруг изменилось",
    "Прочность начинается с внутреннего равновесия",
    "Камни — это память земли",
  ];

  function randomPhrase(array: string[]): string {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

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

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: crypto.randomUUID(),
      items: cart,
      phrase: randomPhrase(phrases),
    };

    setPendingOrder(newOrder);
    // setOrders((prev) => [...prev, newOrder]);
    // setCart([]);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    if (!pendingOrder) return;

    setOrders((prev) => [...prev, pendingOrder]);
    setCart([]);
    setPendingOrder(null);
    setModalOpen(false);
  };

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
      {isModalOpen && pendingOrder && (
        <Modal
          order={pendingOrder}
          getOrderImage={getOrderImage}
          onClose={handleModalClose}
        />
      )}

      <Orders orders={orders} getOrderImage={getOrderImage} />
    </>
  );
}

export default App;
