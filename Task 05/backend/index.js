import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import mailRoutes from "./routes/mail.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.CONN_STRING)
  .then(() => console.log("connected to atlas cloud"))
  .catch(() => {
    console.log(
      "===>> error connecting to cloud\n===>> now connecting to local"
    );
    mongoose
      .connect(process.env.CONN_LOCAL_STRING)
      .then(() => console.log("connected to local"))
      .catch(() => console.log("error connecting local"));
  })
  .finally(() => console.log("start"));

app.use(express());
app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.listen(process.env.PORT, () => {
  console.log("backend is serving on port 3002");
});

app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);
