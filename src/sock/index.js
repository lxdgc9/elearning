const jwt = require("socket.io");
const socketio = require("socket.io");
const Class = require("../model/class");

function createSock(ws) {
  const io = new socketio.Server(ws, {
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

module.exports = createSock;
