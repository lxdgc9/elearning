const socketio = require("socket.io");

let io;

function createSock(ws) {
  io = new socketio.Server(ws, {
    cors: {
      origin: ["https://elearning.gdvietnam.com"],
    },
  });

  console.log("Socket is starting!!!");

  io.on("connection", (socket) => {
    console.log("a socket connected", socket.id);

    socket.on("join-room", (roomId) => {
      console.log("Join room event: ", socket.id, roomId);
      socket.join(roomId);
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
    });

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
