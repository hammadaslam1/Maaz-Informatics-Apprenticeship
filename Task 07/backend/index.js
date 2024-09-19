import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import userRoutes from "./routes/user.routes.js";
import notificationRoutes from "./routes/notif.routes.js";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/messages.model.js";

// Connect to MongoDB

dotenv.config();
process.env.GOOGLE_APPLICATION_CREDENTIALS;
initializeApp({
  credential: applicationDefault(),
  projectId: "practice-fcm-4312e",
});

mongoose
  .connect(process.env.CONN_STRING)
  .then(() => console.log("Connected to MongoDB local"))
  .catch(() => console.log("Failed to connect to MongoDB"));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send previous messages to the new user
  Message.find().then((messages) => {
    socket.emit("previousMessages", messages);
  });

  // Listen for new messages
  socket.on("sendMessage", (data) => {
    const newMessage = new Message(data);
    newMessage.save().then(() => {
      io.emit("receiveMessage", data); // Broadcast to all clients
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
server.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
app.use("/api/user", userRoutes);
app.use("/api/notification", notificationRoutes);
app.all("*", (req, res) => {
  res.status(404).send("route does not exist");
});
