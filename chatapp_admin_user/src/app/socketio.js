import io from "socket.io-client";

const socketio = io("https://hammad-chat-next.vercel.app", {
  transports: ["polling"],
});

export default socketio;
