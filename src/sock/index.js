const socketio = require("socket.io");
const Group = require("../model/group");

let io;
const users = {};

function createSock(ws) {
  io = new socketio.Server(ws, {
    cors: {
      origin: "*",
    },
  });

  console.log("Socket is starting!!!");

  let members = []; // danh sách user trong room

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

      members = await peers.map((peer) => {
        return [peer.id, peer.data.username];
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

      socket.on("leave room", () => {
        socket.disconnect();
      });
    });

    socket.on("callUser", ({ signalData, from }) => {
      io.emit("callUser", { signal: signalData, from });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("callUser", ({ signalData, from }) => {
      io.emit("callUser", { signal: signalData, from });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    //----------------------------------

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
      socket.broadcast.emit("callEnded");
      delete users[socket.id];
      console.log(members);
      members = members.filter((m) => m[0] !== socket.id);
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
