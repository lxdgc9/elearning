function conn(io) {
  io.on("connection", (socket) => {
    console.log("Ws connected:", socket.id);
  });
}

export { conn };
