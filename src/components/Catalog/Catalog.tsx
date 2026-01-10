import React, { useEffect, useState } from "react";
import { Stone, StoneClass, Drink, CartItem } from "../../types";

import "./Catalog.css";

type CatalogProps = {
  drinks: Drink[];
  stones: Stone[];
  stoneClasses: StoneClass[];
  addToCart: (item: CartItem) => void;
};

function Catalog({ drinks, stones, stoneClasses, addToCart }: CatalogProps) {
  // const [cart, setCart] = useState<CartItem[]>([]);

  // const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string>("");
  // const [stoneClasses, setStoneClasses] = useState<StoneClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  // const [stones, setStones] = useState<Stone[]>([]);
  const [selectedStone, setSelectedStone] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number>(0);

  const currentDrink = drinks.find((d) => d.id === selectedDrink);
  const currentStone = stones.find((s) => s.id === selectedStone);
  const currentClass = stoneClasses.find((s) => s.id === selectedClass);
  const recommendedStones = currentDrink
    ? stones.filter((s) => currentDrink.recommendation.stones.includes(s.id))
    : [];
  const isStoneRecommended = (id: string): boolean =>
    !!currentDrink?.recommendation.stones.includes(id);
  const filteredStones = selectedClass
    ? stones.filter((s) => s.class === selectedClass)
    : stones;
  const totalPrice =
    selectedSize && currentClass ? (selectedSize / 3) * currentClass.price : 0;

  function handleAddToCart() {
    if (!selectedClass || !selectedSize || !currentClass) return;

    const price = (selectedSize / 3) * currentClass.price;

    const item: CartItem = {
      id: crypto.randomUUID(),
      stoneId: selectedStone || undefined,
      classId: selectedClass,
      size: selectedSize,
      price,
    };

    addToCart(item);

    // сброс формы
    setSelectedDrink("");
    setSelectedClass("");
    setSelectedStone("");
    setSelectedSize(0);
  }

  return (
    <section id="catalog">
      Catalog
      <form action="">
        <fieldset>
          <label htmlFor="drinks">Напиток:</label>
          <select
            id="drinks"
            name="drinks"
            value={selectedDrink}
            onChange={(e) => setSelectedDrink(e.target.value)}
          >
            <option value="">не важно</option>
            {drinks.map((drink) => (
              <option key={drink.id} value={drink.id}>
                {drink.name}
              </option>
            ))}
          </select>
          {currentDrink && (
            <div className="recommendation">
              <p>Цель: {currentDrink.recommendation.goal}</p>
              <p>Рекомендуем:</p>
              {
                <ul>
                  {recommendedStones.map((s) => (
                    <li key={s.id}>{s.name}</li>
                  ))}
                </ul>
              }
            </div>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="class">Класс камней:</label>
          <select
            name="class"
            id="class"
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedStone("");
            }}
          >
            <option value="">все</option>

            {stoneClasses.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name}
              </option>
            ))}
          </select>
          {currentClass && (
            <div className="description">
              <p>{currentClass.description}</p>
              <p>Цена: {currentClass.price} ю. за тройку</p>
            </div>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="stones">Камень:</label>
          <select
            id="stones"
            name="stones"
            value={selectedStone}
            onChange={(e) => {
              const stoneId = e.target.value;
              setSelectedStone(stoneId);
              const stone = stones.find((s) => s.id === stoneId);
              if (stone) {
                setSelectedClass(stone.class);
              }
            }}
          >
            {selectedClass ? (
              <option value="">Случайные из класса</option>
            ) : (
              <option value="">-- Выберите камень --</option>
            )}
            {filteredStones.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
                {isStoneRecommended(s.id) && "⭐ "}
              </option>
            ))}
          </select>
          <div className="description">
            {currentStone ? (
              <>
                <img
                  src={`/pics/stones/${currentStone.id}.jpg`}
                  alt={currentStone.name}
                />
                <p>{currentStone.description}</p>
                <p>
                  {isStoneRecommended(currentStone.id) &&
                    "⭐ Идеально подходит к выбранному напитку"}
                </p>
              </>
            ) : selectedClass ? (
              <>
                <p>
                  Случайная комбинация камней из класса &laquo;
                  {currentClass?.name}
                  &raquo;:{" "}
                </p>
                <ul>
                  {filteredStones.map((s) => (
                    <li key={s.id}>{s.name}</li>
                  ))}
                </ul>
                <p>
                  Если хотите узнать больше о конкретном камне, выберите его в
                  списке.
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </fieldset>

        <fieldset>
          <label htmlFor="type">Размер набора:</label>
          <select
            name="type"
            id="type"
            value={selectedSize}
            onChange={(e) => setSelectedSize(+e.target.value)}
          >
            <option value="">-- Выберите размер набора --</option>
            <option value="3">3 - тихий вечер</option>
            <option value="6">6 - уютный разговор</option>
            <option value="9">9 - для компании</option>
          </select>
        </fieldset>
        <p>
          Выбрано:{" "}
          {currentStone
            ? currentStone.name
            : currentClass
            ? currentClass.name
            : ""}
          , {selectedSize} шт.
        </p>
        <p>Цена набора: {totalPrice} ю.</p>

        <button type="button" onClick={handleAddToCart}>
          В корзину
        </button>
      </form>
    </section>
  );
}

export default Catalog;
