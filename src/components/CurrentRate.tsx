import React from "react";
import { observer } from "mobx-react-lite";
import { rateStore } from "../stores/RateStore";

export const CurrentRate: React.FC = observer(() => {
  return (
    <div className="mb-4">
      <h4>Current rate: 1 token = {rateStore.rate.toFixed(2)} $</h4>
    </div>
  );
});