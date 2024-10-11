/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSelector } from "react-redux";
import ReceivedMessage from "../../../components/messageBoxes/ReceivedMessage";
import SelfMessage from "../../../components/messageBoxes/SelfMessage";
import { useEffect, useState } from "react";
import socketio from "@/app/socketio";
import { Avatar, IconButton } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ChatHeader from "@/components/appbars/ChatHeader";
import MessageBar from "@/components/appbars/MessageBar";

const ChatroomLayout = () => {
  const { selectedUser, currentUser, conversation } = useSelector(
    (state) => state.user
  );
  const [messages, setMessages] = useState(null);
  const [msgInput, setMsgInput] = useState("");
  const handleMessage = async () => {
    if (msgInput.trim() === "") return;
    socketio.emit("sendMessage", {
      conversation_id: selectedUser?.is_admin
        ? currentUser?.id
        : selectedUser?.id,
      sender_id: currentUser?.id,
      text: msgInput,
      type: "text",
    });
    setMsgInput("");
  };
  useEffect(() => {
    socketio.on("newMessage", async (data) => {
      if (data.success) {
        if (data?.newMessage?.conversation_id !== selectedUser?.id) {
          return;
        }
        setMessages([...messages, data?.newMessage]);
        console.log("the new message is " + data?.newMessage);
      }
    });
    return () => {
      socketio.off("newMessage");
    };
  }, [conversation]);
  useEffect(() => {
    socketio.emit("getMessages", selectedUser?.id);
    socketio.on("receiveMessages", (data) => {
      if (data.success) {
        setMessages(data.messages);
      } else {
        setMessages(null);
      }
    });
  }, [selectedUser]);
  return (
    <div className="flex flex-col h-screen w-full">
      <ChatHeader />
      <div className="flex flex-grow flex-col w-full overflow-auto no-scrollbar">
        {messages &&
          messages.length > 0 &&
          messages.map((data, i) =>
            data?.sender_id === currentUser?.id ? (
              <SelfMessage message={data} key={i} index={i} />
            ) : (
              <ReceivedMessage message={data} key={i} index={i} />
            )
          )}
      </div>
      <MessageBar />
    </div>
  );
};

export default ChatroomLayout;
