import React, { useEffect, useState } from "react";

import "./Modal.css";

import { OrderModalProps } from "../../types";

function Modal({ order, getOrderImage, onClose }: OrderModalProps) {
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="cover" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <p className="phrase">{randomPhrase(phrases)}</p>
        <p>Заказанные камни:</p>
        <div className="orderedStones">{getOrderImage()}</div>
        <button>Получить</button>
      </div>
      <p></p>
    </div>
  );
}

export default Modal;
