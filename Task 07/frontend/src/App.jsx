import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import ChatRoom from "./components/chat/ChatRoom";
import MessageInput from "./components/chat/MessageInput";

const socket = io("http://localhost:4000");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch previous messages from the server
    socket.on("previousMessages", (messages) => {
      setMessages(messages);
    });

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, [messages]);

  const handleSendMessage = (message) => {
    const newMessage = {
      username: "hammadaslam10",
      roomName: "Hammad`s room",
      message: message,
    }; // You can add dynamic username
    socket.emit("sendMessage", newMessage); // Send message to the server
  };

  return (
    <div className="app-container">
      <ChatRoom messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
