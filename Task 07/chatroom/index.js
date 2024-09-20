import mongoose from "mongoose";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/messages.model.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

mongoose
  .connect(process.env.CONN_STRING)
  .then(() => console.log("Connected to MongoDB local"))
  .catch(() => console.log("Failed to connect to MongoDB"));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3002;
io.on("connection", (socket) => {
  console.log("socket connected: ", socket.id);
  Message.find().then((messages) => {
    socket.emit("previousMessages", messages);
  });

  socket.on("sendMessage", (data) => {
    const newMessage = new Message(data);
    newMessage.save().then(() => {
      io.emit("receiveMessage", newMessage);
    });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/getMessages", async (req, res) => {
  Message.find().then((messages) => {
    res.json(messages);
  });
});
app.use("/api/user", userRoutes);
app.all("*", (req, res) => {
  res.status(404).send("route does not exist");
});
