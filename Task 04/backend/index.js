import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routes/apiRouter.js";
import mongoose from "mongoose";
import { connString } from "./secret.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'

console.log(process.env.PORT);
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

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", apiRouter);
