import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: new Date(),
  },
});

const ChatRoom = mongoose.model("ChatRoom", messageSchema);

export default ChatRoom;
