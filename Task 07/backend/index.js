import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import userRoutes from "./routes/user.routes.js";

// Connect to MongoDB

dotenv.config();

mongoose
  .connect(process.env.CONN_STRING)
  .then(() => console.log("Connected to MongoDB local"))
  .catch(() => console.log("Failed to connect to MongoDB"));

const app = express();
// app.use(upload.none());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/user", userRoutes);
app.all("*", (req, res) => {
  res.status(404).send("API does not exist");
});
