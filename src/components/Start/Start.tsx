import React from "react";

import "./Start.css";

function Start() {
  return (
    <section className="hero">
      <div className="content wrapper">
        <nav>
          <ul>
            <li>
              <a href="#about">О проекте</a>
            </li>
            <li>
              <a href="#catalog">Каталог</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#cart">Корзина</a>
            </li>
          </ul>
        </nav>
        <header>
          <h1>Spirit Stones</h1>
          <h2>Душевные камни</h2>
          <p>
            Натуральные охлаждающие камни.
            <br />
            Для напитков с характером. Для моментов со смыслом.
          </p>
          <button
            type="button"
            onClick={() => document.getElementById("catalog")?.scrollIntoView()}
          >
            Выбрать набор
          </button>
        </header>
      </div>
    </section>
  );
}

export default Start;
