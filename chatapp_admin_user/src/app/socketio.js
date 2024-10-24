import io from "socket.io-client";

// const socketio = io("https://hammad-chat-next.vercel.app", {
//   transports: ["polling"],
// });
const socketio = io();

export default socketio;
