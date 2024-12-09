import { makeAutoObservable, runInAction } from "mobx";
import { socket } from "../utils/websocket";

export interface Order {
  id: number;
  amountTokens: number;
  amountDollars: number;
  status: "Processing" | "Completed";
  createdAt: string;
}

class OrderStore {
  orders: Order[] = [];

  constructor() {
    makeAutoObservable(this);

    // Listen for initial order list from the server
    socket.on("orderList", (initialOrders: Order[]) => {
      runInAction(() => { 
        this.orders = initialOrders;
      });
    });

    // Listen for new orders
    socket.on("newOrder", (newOrder: Order) => {
      this.orders.push(newOrder);
    });

    // Listen for order status updates
    socket.on("orderUpdated", (updatedOrder: Order) => {
      const index = this.orders.findIndex((order) => order.id === updatedOrder.id);
      if (index !== -1) {
        this.orders[index] = updatedOrder;
      }
    });
  }

  // Emit new order creation event via WebSocket
  createOrder(amountTokens: number, amountDollars: number) {
    const newOrder = { amountTokens, amountDollars };
    socket.emit("createOrder", newOrder);
  }
}

export const orderStore = new OrderStore();
