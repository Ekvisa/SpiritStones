import React, { useEffect, useState } from "react";
import Start from "../Start/Start";
import About from "../About/About";
import Catalog from "../Catalog/Catalog";
import FAQ from "../FAQ/FAQ";
import Cart from "../Cart/Cart";
import "./App.css";

import { Stone, StoneClass, Drink, CartItem } from "../../types";

function App() {
  const [stones, setStones] = useState<Stone[]>([]);
  const [stoneClasses, setStoneClasses] = useState<StoneClass[]>([]);
  // const [selectedClass, setSelectedClass] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  // const [selectedStone, setSelectedStone] = useState<string>("");
  // const [selectedSize, setSelectedSize] = useState<number>();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  //   const [selectedDrink, setSelectedDrink] = useState<string>("");
  //   const currentDrink = drinks.find((d) => d.id === selectedDrink);

  // const currentStone = stones.find((s) => s.id === selectedStone);
  //  const currentClass = stoneClasses.find((s) => s.id === selectedClass);

  //    const recommendedStones = currentDrink
  //   ? stones.filter((s) => currentDrink.recommendation.stones.includes(s.id))
  //   : [];
  // const isStoneRecommended = (id: string): boolean =>
  //   !!currentDrink?.recommendation.stones.includes(id);
  // const filteredStones = selectedClass
  //   ? stones.filter((s) => s.class === selectedClass)
  //   : stones;
  // const totalPrice =
  //   selectedSize && currentClass ? (selectedSize / 3) * currentClass.price : 0;

  useEffect(() => {
    fetch("http://localhost:3002/stones")
      .then((r) => r.json())
      .then(setStones);

    fetch("http://localhost:3002/stoneClasses")
      .then((r) => r.json())
      .then(setStoneClasses);

    fetch("http://localhost:3002/drinks")
      .then((res) => res.json())
      .then((data) => setDrinks(data));
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
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
      />
    </>
  );
}

export default App;
