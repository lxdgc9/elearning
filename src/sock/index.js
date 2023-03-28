// socket.js
const socketio = require("socket.io");

class Socket {
  constructor(ws) {
    this.io = new socketio.Server(ws, {
      cors: {
        origin: "*",
      },
    });
    this.io.on("connection", (socket) => {
      console.log("a socket connected", socket.id);

      socket.on("disconnect", () => {
        console.log("a socket disconnected", socket.id);
      });
    });
  }

  getInstance() {
    return this.io;
  }
}

let instance = null;

function createSocket(ws) {
  if (!instance) {
    instance = new Socket(ws);
  }

  return instance;
}

module.exports = createSocket;
