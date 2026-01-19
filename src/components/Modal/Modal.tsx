import React, { JSX, useEffect, useState } from "react";

import "./Modal.css";

import { Order, CartItem } from "../../types";

type OrderModalProps = {
  order: Order;
  getOrderImage: (items: CartItem[]) => JSX.Element;
  onClose: () => void;
};

function Modal({ order, getOrderImage, onClose }: OrderModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="cover" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <p className="phrase">{order.phrase}</p>
        <p>Заказанные камни:</p>
        <div className="orderedStones">{getOrderImage(order.items)}</div>
        <button onClick={onClose}>Получить</button>
      </div>
    </div>
  );
}

export default Modal;
