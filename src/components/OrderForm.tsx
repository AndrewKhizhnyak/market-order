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
    const amountTokens =
      inputMode === "tokens" ? amount : amount / rateStore.rate;
    const amountDollars =
      inputMode === "dollars" ? amount : amount * rateStore.rate;

    orderStore.createOrder(amountTokens, amountDollars);
    setAmount(0); // Clear input field
  };

  return (
    <div className="card mb-4">
      <div className="card-header text-center">
        <h4>Create Market Order</h4>
      </div>
      <div className="card-body">
        <div className="mb-1">
          <label className="form-label">Enter Amount:</label>
          <input
            type="number"
            className="form-control"
            value={amount || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              inputMode === "tokens" ? "Amount in tokens" : "Amount in dollars"
            }
          />
        </div>
        <div className="mb-3">
          <small className="text-muted">
            {inputMode === "tokens"
              ? `Equivalent to ${(amount * rateStore.rate).toFixed(2)} $`
              : `Equivalent to ${(amount / rateStore.rate).toFixed(4)} Tokens`}
          </small>
        </div>
        <div className="btn-group mb-3 w-100">
          <button
            className={`btn ${
              inputMode === "tokens" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setInputMode("tokens")}
          >
            Enter in Tokens
          </button>
          <button
            className={`btn ${
              inputMode === "dollars" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setInputMode("dollars")}
          >
            Enter in Dollars
          </button>
        </div>
        <button className="btn btn-success w-100" onClick={createOrder}>
          Create Order
        </button>
      </div>
    </div>
  );
});
