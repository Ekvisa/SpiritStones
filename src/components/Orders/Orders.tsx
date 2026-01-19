import { JSX } from "react";
// import { Order } from "../../types";
import { Order, CartItem } from "../../types";

import "./Orders.css";

type OrdersProps = {
  orders: Order[];
  getOrderImage: (items: CartItem[]) => JSX.Element;
};

function Orders({ orders, getOrderImage }: OrdersProps) {
  return (
    <section className="light">
      <div className="content wrapper">
        <h2>Заказы</h2>
        {orders.length === 0 && <p>Заказов пока нет</p>}

        {orders.map((order, i) => (
          <div key={order.id} className="order">
            <h4>#{i + 1}:</h4>
            <p className="phrase">{order.phrase}</p>
            {getOrderImage(order.items)}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orders;
