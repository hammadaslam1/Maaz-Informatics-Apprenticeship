import Conversation from "./mongodb/models/conversation.model.js";
import Message from "./mongodb/models/message.model.js";
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

    User.find().select({
      password: 0,
      __v: 0
    }).then((user) => {
      socket.emit("getAllUsers", user);
    });
    socket.on("getConversation", (data) => {
      Conversation.findOne({
        members: { $all: [data.senderId, data.receiverId] },
      }).then((conversation) => {
        console.log(conversation);
        io.emit("receiveConversation", conversation);
      });
    });
    socket.on("newConversation", async (data) => {
      const exist = await Conversation.findOne({
        members: { $all: [data.receiverId, data.senderId] },
      });

      if (exist) {
        return;
      }
      const newConversation = new Conversation({
        members: [data.senderId, data.receiverId],
      });
      newConversation.save().then((conversation) => {
        console.log(conversation);

        io.emit("receiveConversation", conversation);
      });
    });

    socket.on("sendMessage", async (data) => {
      const newMessage = new Message(data);
      await newMessage.save();
      Conversation.findByIdAndUpdate(data.conversationId, {
        message: data.text,
      }).then((conversation) => {
        Message.find({ conversationId: data.conversationId }).then(
          (messages) => {
            io.emit("getMessage", messages);
          }
        );
      });
    });

    socket.on("getMessages", (id) => {
      Message.find({ conversationId: id }).then((messages) => {
        io.emit("getMessage", messages);
      });
    });

    socket.on("userOnline", (userId) => {
      if (!onlineUsers[userId]) {
        onlineUsers[userId] = socket.id;
      }
      console.log("Online users: ", onlineUsers);

      io.emit("updateUserStatus", { onlineUsers });
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
