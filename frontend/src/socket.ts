import { io } from "socket.io-client";

const URL = import.meta.env.SOCKETIO_URL
  ? import.meta.env.SOCKETIO_URL
  : "http://localhost:3000";

export const socket = io(URL, { autoConnect: false });
