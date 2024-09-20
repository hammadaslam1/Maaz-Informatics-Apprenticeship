import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatID: {
    type: String,
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
  messages: {
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      default: new Date().toISOString(),
    },
  },
  status: "user",
});

const UserChat = mongoose.model("user_chats", messageSchema);

export default UserChat;
