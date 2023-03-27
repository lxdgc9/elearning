import { Server } from "socket.io";

function createSock(ws) {
  const io = new Server(ws, {
    cors: {
      origin: "*",
    },
  });

  console.log("Created socket");

  io.on("connection", (socket) => {
    console.log("A socket connected", socket.id);

    socket.on("disconnect", () => {
      console.log("A socket disconnected", socket.id);
    });
  });
}

export { createSock };
