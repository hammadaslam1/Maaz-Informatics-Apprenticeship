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
    type: [
      {
        sender: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          default: new Date().toISOString(),
        },
      },
    ],
  },
  status: {
    type: String,
    default: "group",
  },
});

const GroupChat = mongoose.model("group_chats", messageSchema);

export default GroupChat;
