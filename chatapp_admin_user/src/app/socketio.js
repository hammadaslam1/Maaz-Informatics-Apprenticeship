import io from "socket.io-client";

const socketio = io({
    transports: ['polling']
});

export default socketio;
