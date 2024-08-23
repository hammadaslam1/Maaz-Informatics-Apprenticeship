import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connString } from "./secret.js";
import studentRoutes from "./routes/student.routes.js";

mongoose
  .connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e))
  .finally(() => console.log("start"));

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});

app.use("/api/students", studentRoutes);
