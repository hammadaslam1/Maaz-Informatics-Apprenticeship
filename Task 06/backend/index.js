import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

// Connect to MongoDB

mongoose
  .connect(process.env.CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/users", userRoutes);
app.all("*", (req, res) => {
  res.status(404).send("API does not exist");
});
