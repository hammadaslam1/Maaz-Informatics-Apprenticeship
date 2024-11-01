import Conversation from "./mongodb/models/conversation.model.js";
import Message from "./mongodb/models/message.model.js";
import User from "./mongodb/models/user.model.js";

let users = [];
let onlineUsers = {};
let currentChats = {};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export const socketHandler = (io) => {
  io.on("connection", async (socket) => {
    console.log("user connected: ", socket.id);
    const conversations = await getAllConversations();
    if (conversations.length > 0) {
      conversations.forEach((conversation) => {
        socket.join(conversation?._id);
      });
    }
    socket.emit("getAllUsers", await getAllUsers());
    socket.on("joinConversation", (room) => {
      socket.join(room);
      currentChats[socket.id] = room;
    });
    socket.on("userRegistered", async () => {
      const newCon = await getAllConversations();
      if (newCon.length > 0) {
        newCon.forEach((conversation) => {
          socket.join(conversation?._id);
        });
      }
      socket.emit("getAllUsers", await getAllUsers());
    });
    socket.on("getConversation", (data) => {
      Conversation.findOne({
        members: { $all: [data.senderId, data.receiverId] },
      }).then((conversation) => {
        io.emit("receiveConversation", conversation);
      });
    });
    socket.on("newConversation", async (data) => {
      const exist = await Conversation.findOne({
        members: { $all: [data.receiverId, data.senderId] },
      });
      if (exist) return;
      const newConversation = new Conversation({
        members: [data.senderId, data.receiverId],
      });
      newConversation.save().then((conversation) => {
        io.emit("receiveConversation", conversation);
      });
    });
    socket.on("seenAllMessages", async (data) => {
      await User.findByIdAndUpdate(data?.senderId, {
        $pull: { newChats: data?.receiverId },
      });
      await Message.updateMany(
        {
          conversationId: data?.conversationId,
          receiverId: data?.senderId,
        },
        {
          status: "seen",
        }
      );
    });
    socket.on("sendMessage", async (data) => {
      const status = Object.keys(onlineUsers).includes(data?.receiverId);
      const receiverSocketId = onlineUsers[`${data?.receiverId}`];
      const isRecipientInRoom =
        currentChats[receiverSocketId] === data?.conversationId;

      await User.findByIdAndUpdate(data?.senderId, {
        $pull: { newChats: data?.receiverId },
      });
      await Message.updateMany(
        {
          conversationId: data?.conversationId,
          receiverId: data?.senderId,
        },
        {
          status: "seen",
        }
      );
      const newMessage = new Message({
        ...data,
        status: isRecipientInRoom ? "seen" : status ? "delivered" : "sent",
      });
      await newMessage.save();
      !isRecipientInRoom &&
        (await User.findByIdAndUpdate(data?.receiverId, {
          $push: {
            newChats: data?.senderId,
          },
        }));
      Conversation.findByIdAndUpdate(data.conversationId, {
        message: data.type === "text" ? data.text : "media",
      }).then((conversation) => {
        io.to(data.conversationId).emit("newMessage", {
          ...newMessage,
        });
        Message.find({ conversationId: data.conversationId }).then(
          async (messages) => {
            io.emit("getAllUsers", await getAllUsers());
            io.emit("receiveConversation", conversation);
            io.to(data.conversationId).emit("getMessage", messages);
          }
        );
      });
    });

    socket.on("getMessages", (id) => {
      Message.find({ conversationId: id }).then((messages) => {
        io.to(id).emit("getMessage", messages);
      });
    });

    socket.on("userOnline", async (userId) => {
      if (!onlineUsers[userId]) {
        onlineUsers[userId] = socket.id;
      }
      console.log(onlineUsers);
      io.emit("getAllUsers", await getAllUsers());
      io.emit("updateUserStatus", { onlineUsers });
    });

    socket.on("disconnect", () => {
      const disconnectedUserId = getUserIdBySocketId(socket.id);
      if (disconnectedUserId) {
        delete onlineUsers[disconnectedUserId];
        delete currentChats[disconnectedUserId];
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

  const getAllConversations = async () => {
    const conversations = await Conversation.find({});
    return conversations;
  };
  const getAllUsers = async () => {
    const users = await User.find().select({ password: 0 });
    return users;
  };
};
