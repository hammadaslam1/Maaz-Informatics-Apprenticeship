import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatID: {
    type: String,
    required: true,
    unique: true,
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
  status: "group",
});

const GroupChat = mongoose.model("group_chats", messageSchema);

export default GroupChat;
