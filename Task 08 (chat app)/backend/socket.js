import Conversation from "./mongodb/models/conversation.model.js";
import Message from "./mongodb/models/message.model.js";
import User from "./mongodb/models/user.model.js";

let users = [];
let onlineUsers = {};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export const socketHandler = (io) => {
  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);
    socket.on("joinConversation", (room) => {
      socket.join(room);
      console.log("User joined room:", room);
    });
    const users = await User.find().select({
      password: 0,
      __v: 0,
    });
    socket.emit("getAllUsers", users);

    socket.on("getConversation", (data) => {
      Conversation.findOne({
        members: { $all: [data.senderId, data.receiverId] },
      }).then((conversation) => {
        console.log(conversation);
        io.emit("receiveConversation", conversation);
      });
    });
    socket.on("newConversation", async (data) => {
      console.log(data);

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
      console.log(data);
      const status = Object.keys(onlineUsers).includes(data?.receiverId)
      const newMessage = new Message({
        ...data,
        status: status ? 'delivered' : 'sent'
      });
      await newMessage.save();

      Conversation.findByIdAndUpdate(data.conversationId, {
        message: data.text,
      }).then((conversation) => {
        io.to(data.conversationId).emit("newMessage", {
          ...newMessage,
        });
        Message.find({ conversationId: data.conversationId }).then((messages) => {
          io.to(data.conversationId).emit("getMessage", messages);
        });
      });
    });

    socket.on("getMessages", (id) => {
      // console.log(id);

      Message.find({ conversationId: id }).then((messages) => {
        console.log('Got messages');

        io.to(id).emit("getMessage", messages);
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
      io.emit("updateUserStatus", { onlineUsers });
    });
  });

  const getUserIdBySocketId = (socketId) => {
    return Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socketId
    );
  };
};
