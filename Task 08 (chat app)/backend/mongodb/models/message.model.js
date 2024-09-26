import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
      enum: ["text", "image", "document", "video"],
    },
    status: {
      type: String,
      default: "sent",
      enum: ["sent", "delivered", "seen"],
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
