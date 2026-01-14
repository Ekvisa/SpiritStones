import React, { useState } from "react";
// import { Order } from "../../types";
import { CartItem } from "../../types";

import "./Orders.css";

function Orders(allOrders: CartItem[][]) {
  return (
    <section id="orders" className="light">
      <div className="content wrapper">
        <h2>Заказы:</h2>
        {allOrders[0][0].id}
        {allOrders[0][0].size}

        {allOrders.length === 0 && <p>No orders</p>}

        {/* <ul>
          {allOrders.map((item) => {
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
        </ul> */}
      </div>
    </section>
  );
}

export default Orders;
