import { makeAutoObservable } from "mobx";
import { socket } from "../utils/websocket";

class RateStore {
  rate = 100; // Rate of 1 token in USD

  constructor() {
    makeAutoObservable(this);
  }

  setRate(newRate: number) {
    this.rate = newRate;
  }
}

export const rateStore = new RateStore();

socket.on("rateUpdate", (rate: number) => {
  rateStore.setRate(rate);
});
