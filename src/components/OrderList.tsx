// src/components/OrderList.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import { orderStore } from "../stores/OrderStore";

export const OrderList: React.FC = observer(() => {
  return (
    <div className="card">
      <div className="card-header text-center">
        <h4>Order List</h4>
      </div>
      <div className="card-body">
        {orderStore.orders.length === 0 ? (
          <p className="text-center text-muted">No orders available</p>
        ) : (
          <ul className="list-group">
            {orderStore.orders.map((order) => (
              <li
                key={order.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <div>
                    <strong>Tokens:</strong> {order.amountTokens.toFixed(4)}
                  </div>
                  <div>
                    <strong>Dollars:</strong> {order.amountDollars.toFixed(2)}
                  </div>
                </div>
                <div>
                  <span
                    className={`badge ${
                      order.status === "Processing"
                        ? "bg-warning"
                        : "bg-success"
                    } me-2`}
                  >
                    {order.status}
                  </span>
                  <div>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});
