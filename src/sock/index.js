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

    socket.on("stream", (id) => {
      socket.broadcast.emit("stream", { id });
    });

    socket.on("offer", (data) => {
      io.to(data.id).emit("offer", data.offer);
    });

    socket.on("answer", (data) => {
      io.to(data.id).emit("answer", data.answer);
    });

    socket.on("join-room", (roomId) => {
      console.log("Join room event: ", socket.id, roomId);
      socket.join(roomId);
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
    });

    socket.on("on-stream", async (roomId) => {
      try {
        const group = await Group.findByIdAndUpdate(
          roomId,
          {
            $set: {
              isStream: true,
            },
          },
          {
            new: true,
          }
        );
        if (!group) {
          socket.emit("error", "Nhóm không tồn tại");
        }

        if (group.isStream) {
          io.to(group._id.toString()).emit(
            "on-stream",
            group
          );
        }
      } catch (err) {
        console.log(err);
        socket.emit("error", "Có lỗi xảy ra");
      }
    });

    socket.on("off-stream", async (roomId) => {
      try {
        const group = await Group.findByIdAndUpdate(
          roomId,
          {
            $set: {
              isStream: false,
            },
          },
          {
            new: true,
          }
        );
        if (!group) {
          socket.emit("error", "Nhóm không tồn tại");
        }

        if (!group.isStream) {
          io.to(group._id.toString()).emit(
            "off-stream",
            group
          );
        }
      } catch (err) {
        console.log(err);
        socket.emit("error", "Có lỗi xảy ra");
      }
    });

    socket.on("signal", (data) => {
      socket.broadcast.emit("signal", data);
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
