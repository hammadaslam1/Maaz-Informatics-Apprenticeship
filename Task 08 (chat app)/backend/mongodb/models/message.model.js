import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
      default: "notSent",
      enum: ["sent", "delivered", "seen", "notSent"],
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
