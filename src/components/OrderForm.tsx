import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { rateStore } from "../stores/RateStore";
import { orderStore } from "../stores/OrderStore";

export const OrderForm: React.FC = observer(() => {
  const [inputMode, setInputMode] = useState<"tokens" | "dollars">("tokens");
  const [amount, setAmount] = useState<number>(0);

  const handleInputChange = (value: string) => {
    setAmount(parseFloat(value) || 0);
  };

  const createOrder = () => {
    const tokenAmount = inputMode === "tokens" ? amount : amount / rateStore.rate;
    const dollarAmount = inputMode === "dollars" ? amount : amount * rateStore.rate;

    orderStore.addOrder({
      id: Date.now().toString(),
      tokenAmount,
      dollarAmount,
      status: "In progress",
      createdAt: new Date().toLocaleString(),
    });

    setAmount(0); // Reset the input field
  };

  return (
    <div className="mb-4">
      <h4>Creating a market order</h4>
      <div className="mb-3">
        <label className="form-label">Amount:</label>
        <input
          type="number"
          className="form-control"
          value={amount || ""}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={inputMode === "tokens" ? "Tokens" : "Dollars"}
        />
      </div>
      <div className="mb-3">
        <button
          className={`btn btn-${inputMode === "tokens" ? "primary" : "secondary"} me-2`}
          onClick={() => setInputMode("tokens")}
        >
          Tokens
        </button>
        <button
          className={`btn btn-${inputMode === "dollars" ? "primary" : "secondary"}`}
          onClick={() => setInputMode("dollars")}
        >
          Dollars
        </button>
      </div>
      <button className="btn btn-success" onClick={createOrder}>
        Create order
      </button>
    </div>
  );
});
