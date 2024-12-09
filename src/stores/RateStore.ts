import { makeAutoObservable, runInAction } from "mobx";
import { socket } from "../utils/websocket";

class RateStore {
  rate: number = 100; // Initial token rate

  constructor() {
    makeAutoObservable(this);

    // Listen for rate updates from the server
    socket.on("tokenRate", (newRate: number) => {
      runInAction(() => { this.rate = newRate });
    });
  }
}

export const rateStore = new RateStore();
