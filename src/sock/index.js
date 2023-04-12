const socketio = require("socket.io");
const Group = require("../model/group");

let io;

function createSock(ws) {
  io = new socketio.Server(ws, {
    cors: {
      origin: "*",
    },
  });

  console.log("Socket is starting!!!");

  io.on("connection", (socket) => {
    socket.on("join room", async (roomID, name) => {
      //  Lấy roomID và username
      socket.data.username = name;

      // tạo peers với socket trong room
      const peers = await io.in(roomID).fetchSockets();
      if (peers.length === 5) {
        socket.emit("room full");
        return;
      } // đặt giới hạn room

      let members = []; // danh sách members trong room

      await peers.forEach((peer) => {
        members.push([peer.id, peer.data.username]);
      });

      socket.join(roomID);

      socket.emit("getMembers", members);

      socket.on("offer", (data) => {
        socket.to(data.receiver).emit("user-joined", {
          signal: data.signal,
          sender: data.sender,
          senderName: data.senderName,
        });
      });

      socket.on("answer", (data) => {
        socket.to(data.sender).emit("reconnect", {
          signal: data.signal,
          receiver: socket.id,
        });
      });

      socket.on("leave room", async () => {
        const room = socket.rooms;
        const roomID = [...room.keys()];

        if (roomID.length === 1) {
          return;
        }
        socket.to(roomID[1]).emit("user-left", socket.id);
      });
    });

    //----------------------------------

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
