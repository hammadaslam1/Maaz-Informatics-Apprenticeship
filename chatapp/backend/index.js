import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./mongodb/routes/user.routes.js";
import messageRoutes from "./mongodb/routes/message.routes.js";
import conversationRoutes from "./mongodb/routes/conversation.routes.js";
import IpRoute from "./mongodb/routes/server.route.js";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";
import { checkServerIp } from "./mongodb/controllers/server.controller.js";

dotenv.config();
// const upload = multer()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose
  .connect(process.env.conn_string)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

socketHandler(io);
// app.use(upload.none());
app.use("/files", express.static(path.join(__dirname, "files")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://hammad-chatapp.vercel.app",
      "*",
    ],
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);

// app.use("/files", express.static(path.join(__dirname, "files")));
const port = process.env.port || 3002;
const hostingPort = process.env.PORT || port;
server.listen(hostingPort, () => {
  console.log(`Server is running on port ${hostingPort}`);
});
app.get('/',IpRoute)
app.use("/api/user", (req, res)=>{
  console.log("fuytfuytr")
  res.json("running well")
});
// app.use("/api/user", userRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/server", IpRoute);
app.all("*", (req, res) => {
  res.status(404).send("wrong route");
});
