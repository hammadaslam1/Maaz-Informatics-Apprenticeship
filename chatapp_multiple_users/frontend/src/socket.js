import { io } from "socket.io-client";

const server_url = process.env.REACT_APP_SERVER_URL;
const socket = io(server_url);

export default socket;
