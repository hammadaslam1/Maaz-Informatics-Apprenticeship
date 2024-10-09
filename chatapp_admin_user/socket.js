import { Server } from "socket.io";

const getAdmins = async () => {
  // const users = await User.find().select({ password: 0 });
  const response = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
    return data.users;
  } else {
    return data.message;
  }
};
const getAllUsers = async () => {
  // const users = await User.find().select({ password: 0 });
  const response = await fetch("http://localhost:3000/api/users/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
    return data.users;
  } else {
    return data.message;
  }
};

const getMessages = async (id) => {
  // const messages = await Message.find({ userId: id }).select({ _id: 0 });
  const response = await fetch(`http://localhost:3000/api/messages/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  // console.log(data.success && data?.messages);
  return data;
};

const socket = async (server) => {
  const io = new Server(server);
  console.log("socket is called");

  // Socket.io connection
  io.on("connection", async (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("adminOnline", async () => {
      socket.emit("getAllUsers", await getAllUsers());
    });
    socket.on("userOnline", async () => {
      socket.emit("getAdmins", await getAdmins());
    });
    socket.on("sendMessage", async (message) => {
      // Here you would save the message to the MySQL database
      // and broadcast it to all clients
      socket.broadcast.emit("receiveMessage", message);
    });
    socket.on("getMessages", async (id) => {
      socket.emit("receiveMessages", await getMessages(id));
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default socket;
