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
    console.log("a socket connected", socket.id);

    socket.on("join-room", (roomId) => {
      console.log("Join room event: ", socket.id, roomId);
      socket.join(roomId);
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
    });

    socket.on("new-video", async (roomId) => {
      try {
        const group = await Group.findByIdAndUpdate(
          roomId,
          {
            $set: {
              status: true,
            },
          }
        );
        if (!group) {
          socket.emit("error", "Nhóm không tồn tại");
        }

        if (group.status) {
          console.log(socket.rooms);
          console.log(group._id);
          io.emit("join-video", group);
        }
      } catch (err) {
        console.log(err);
        socket.emit("error", "Có lỗi xảy ra");
      }
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
