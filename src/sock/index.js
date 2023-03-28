const socketio = require("socket.io");

let io;

function createSock(ws) {
  io = new socketio.Server(ws, {
    cors: {
      origin: "*",
    },
  });

  console.log("Socket is starting!!!");

  io.on("connection", (socket) => {
    console.log("a socket connected", socket.id);

    socket.on("disconnect", () => {
      console.log("a socket disconnected", socket.id);
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
}

module.exports = {
  getIO,
  createSock,
};
