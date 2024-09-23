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
import multer from "multer";

dotenv.config();
// const upload = multer()
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
mongoose
  .connect(process.env.CONN_STRING)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();
// app.use(upload.none());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);

// app.use("/files", express.static(path.join(__dirname, "files")));
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.all("*", (req, res) => {
  res.status(404).send("route does not exist");
});
