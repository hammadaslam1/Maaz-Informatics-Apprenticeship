import Conversation from "./mongodb/models/conversation.model.js";
import User from "./mongodb/models/user.model.js";

let users = [];
let onlineUsers = {};

const addUser = (userData, socketId) => {
  !users.some((user) => user._id === userData._id) &&
    users.push({ ...userData, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user._id === userId);
};

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    User.find().then((user) => {
      socket.emit("getAllUsers", user);
    });
    socket.on("getConversation", (data) => {
      Conversation.findOne({
        members: { $all: [data.senderId, data.receiverId] },
      }).then((conversation) => {
        io.emit("receiveConversation", conversation);
      });
    });
    socket.on("addUser", (userData) => {
      addUser(userData, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", (data) => {
      const user = getUser(data.receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", data);
      }
    });

    socket.on("userOnline", (userId) => {
      if (!onlineUsers[userId]) {
        onlineUsers[userId] = socket.id;
      }
      console.log("Online users: ", onlineUsers);

      io.emit("updateUserStatus", { onlineUsers: [onlineUsers] });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      const disconnectedUserId = getUserIdBySocketId(socket.id);
      if (disconnectedUserId) {
        delete onlineUsers[disconnectedUserId];
      }

      removeUser(socket.id);
      io.emit("getUsers", users);
      io.emit("updateUserStatus", { onlineUsers });
    });
  });

  const getUserIdBySocketId = (socketId) => {
    return Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socketId
    );
  };
};
