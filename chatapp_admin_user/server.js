import express from "express";
import next from "next";
import { createServer } from "http";
import socket from "./socket.js";

// const dev = process.env.NODE_ENV !== 'production';
const dev = true;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  socket(server);

  //   app.use("/api/users")
  app.all("*", (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server ready on http://localhost:3000");
  });
});