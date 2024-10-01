import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(req.file);
//     let dir = path.join("files");
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 20,
//   },
// }).single("text");
export const newMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    await newMessage.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
    });
    res.status(200).json("Message has been sent successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const uploadFile = async (req, res) => {
  const { path, filename } = req.file;
  const newPath = path.replace(/\\/g, "/");
  console.log(newPath);

  res.status(200).json({ path: newPath });
};

export const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const setDelivered = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const updatedMessages = await Message.updateMany(
      {
        senderId: senderId,
        receiverId: receiverId,
        status: "sent",
      },
      { $set: { status: "delivered" } }
    );

    if (updatedMessages.nModified === 0) {
      return res.status(404).json({ message: "No messages found to update." });
    }

    res.status(200).json({ message: "Messages updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const setSeen = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const updatedMessages = await Message.updateMany(
      {
        senderId: senderId,
        receiverId: receiverId,
        status: "delivered",
      },
      { $set: { status: "seen" } }
    );

    if (updatedMessages.nModified === 0) {
      return res.status(404).json({ message: "No messages found to update." });
    }

    res.status(200).json({ message: "Messages updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
