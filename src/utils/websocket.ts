import { io } from "socket.io-client"; // Import the socket.io client

export const socket = io("http://localhost:3000"); // Connect to the server

socket.on("connect", () => console.log("Connected to WebSocket")); // Log when connected
