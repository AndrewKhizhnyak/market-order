import React from "react";
import { CurrentRate } from "./components/CurrentRate";
import { OrderForm } from "./components/OrderForm";
import { OrderList } from "./components/OrderList";

export const App: React.FC = () => {
  return (
    <div className="container mt-4">
      <CurrentRate />
      <OrderForm />
      <OrderList />
    </div>
  );
};
