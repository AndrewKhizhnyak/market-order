import React from "react";
import { observer } from "mobx-react-lite";
import { orderStore } from "../stores/OrderStore";

export const OrderList: React.FC = observer(() => {
  return (
    <div>
      <h4>List of orders</h4>
      <ul className="list-group">
        {orderStore.orders.map((order) => (
          <li key={order.id} className="list-group-item">
            <div>
              <strong>Tokens:</strong> {order.tokenAmount.toFixed(4)}
            </div>
            <div>
              <strong>Dollars:</strong> {order.dollarAmount.toFixed(2)}
            </div>
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <strong>Time:</strong> {order.createdAt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
