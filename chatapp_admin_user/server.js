import express from "express";
import next from "next";
import { createServer } from "http";
import socket from "./socket.js";
import dotenv from 'dotenv'

dotenv.config()

// const dev = process.env.NODE_ENV !== 'production';
const dev = true;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT
nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  socket(server);

  //   app.use("/api/users")
  app.all("*", (req, res) => handle(req, res));

  server.listen(port || 3000, (err) => {
    if (err) throw err;
    console.log("Server is ready");
  });
});
