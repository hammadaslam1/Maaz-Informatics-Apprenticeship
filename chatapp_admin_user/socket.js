import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

let currentChats = {};

const getAdmins = async () => {
  // const users = await User.find().select({ password: 0 });
  const response = await fetch(`${server_url}/api/users`, {
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
  const response = await fetch(`${server_url}/api/users/admin`, {
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
  const response = await fetch(`${server_url}/api/messages/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data.success && data?.messages);
  return data;
};
const sendMessage = async (message) => {
  const response = await fetch(`${server_url}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const joinConversation = async (user_id, admin_id) => {
  const response = await fetch(`${server_url}/api/conversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, admin_id }),
  });
  const data = await response.json();
  console.log(data);
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
    socket.on("joinConversation", async ({ user_id, admin_id, id }) => {
      socket.join(id);
      currentChats[socket.id] = user_id;
      const data = await joinConversation(user_id, admin_id);
      socket.emit("conversationJoined", data);
    });
    socket.on("sendMessage", async (message) => {
      socket
        .to(message?.conversation_id)
        .emit("newMessage", await sendMessage(message));
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
