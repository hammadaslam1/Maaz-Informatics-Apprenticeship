import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://hammadaslam10:hammadaslam10@task-01.aavgs.mongodb.net/task_05",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected"))
  .catch(() => console.log("error"))
  .finally(() => console.log("start"));

app.use(express());
app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());

app.listen(3002, () => {
  console.log("backend is serving on port 3002");
});

app.use("/api/auth", authRoutes);
