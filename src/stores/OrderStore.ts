import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
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
      runInAction(() => { this.orders = initialOrders });
    });

    // Listen for new orders
    socket.on("newOrder", (newOrder: Order) => {
      runInAction(() => { this.orders.push(newOrder) });
      
    });

    // Listen for order status updates
    socket.on("orderUpdated", (updatedOrder: Order) => {
      const index = this.orders.findIndex((order) => order.id === updatedOrder.id);
      if (index !== -1) {
        runInAction(() => { this.orders[index] = updatedOrder; });
        
      }
    });
  }

  async createOrder(amountTokens: number, amountDollars: number) {
    try {
      const response = await axios.post("http://localhost:3000/orders", {
        amountTokens,
        amountDollars,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }
}

export const orderStore = new OrderStore();
