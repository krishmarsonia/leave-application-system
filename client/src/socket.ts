import { io } from "socket.io-client";

// export let socket;

export const socket = io("http://localhost:5000", {
  autoConnect: false,
});
// export
