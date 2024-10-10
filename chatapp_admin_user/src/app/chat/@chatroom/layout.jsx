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

const ChatroomLayout = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState(null);
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
            i % 2 === 0 ? (
              <SelfMessage message={data} key={i} index={i} />
            ) : (
              <ReceivedMessage message={data} key={i} index={i} />
            )
          )}
      </div>
      <div className="flex min-h-14 w-full items-center bg-[#eff8e2]">
        message box
      </div>
    </div>
  );
};

export default ChatroomLayout;
