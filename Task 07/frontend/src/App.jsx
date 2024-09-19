import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import ChatRoom from "./components/chat/ChatRoom";
import MessageInput from "./components/chat/MessageInput";

// const socket = io("http://192.168.2.106:8000");
const socket = io("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("previousMessages", (messages) => {
      setMessages(messages);
    });
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    const el = document.getElementById("chatroom-container");
    el.scrollTop = el.scrollHeight;

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, [messages]);

  const handleSendMessage = (message) => {
    const newMessage = {
      username: "hammadaslam10",
      // roomname: "Hammad`s room",
      message: message,
      time: new Date(),
    };
    // const newMessage = {
    //   email: "hammadaslam308@gmail.com",
    //   time: new Date().getTime(),
    //   message: message,
    // };
    socket.emit("sendMessage", newMessage);
  };

  return (
    <div className="app-container">
      <div className="chatroom-container" id="chatroom-container">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div className={msg.username == "hammadaslam10" ? "right" : "left"}>
              <div
                className={
                  msg.username == "hammadaslam10"
                    ? "message-right"
                    : "message-left"
                }
              >
                <strong>{msg?.username}:</strong>{" "}
                <span className="message-text">{msg?.message}</span>
                <div>
                  <span className="time">{msg?.time}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-messages">No messages yet!</div>
        )}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
