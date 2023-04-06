import { Server } from "socket.io";

import { conn } from "./conn.js";
import { disconn } from "./disconn.js";

function runWs(ws) {
  const io = new Server(ws, {
    cors: { origin: "*" },
  });

  console.log("Ws listening...");

  conn(io);
  disconn(io);
}

export { runWs };
