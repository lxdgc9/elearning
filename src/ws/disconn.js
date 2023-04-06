function disconn(io) {
  io.on("connection", (socket) => {
    console.log("Ws disconnected:", socket.id);
  });
}

export { disconn };
