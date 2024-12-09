import { makeAutoObservable } from "mobx";
import { socket } from "../utils/websocket";

interface Order {
  id: string;
  tokenAmount: number;
  dollarAmount: number;
  status: string;
  createdAt: string;
}

class OrderStore {
  orders: Order[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addOrder(order: Order) {
    this.orders.push(order);
  }

  updateOrderStatus(id: string, status: string) {
    const order = this.orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
    }
  }
}

export const orderStore = new OrderStore();

socket.on("orderStatusUpdate", ({ id, status }: { id: string; status: string }) => {
  orderStore.updateOrderStatus(id, status);
});
