import { Server } from "socket.io";

const socket = (server) => {
  const io = new Server(server);
  console.log("socket is called");

  // Socket.io connection
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("sendMessage", async (message) => {
      // Here you would save the message to the MySQL database
      // and broadcast it to all clients
      socket.broadcast.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default socket;
