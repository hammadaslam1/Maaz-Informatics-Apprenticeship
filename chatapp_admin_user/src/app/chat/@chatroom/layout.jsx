/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDispatch, useSelector } from "react-redux";
import ReceivedMessage from "../../../components/messageBoxes/ReceivedMessage";
import SelfMessage from "../../../components/messageBoxes/SelfMessage";
import { useEffect, useState } from "react";
import socketio from "@/app/socketio";
import { Avatar, IconButton } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ChatHeader from "@/components/appbars/ChatHeader";
import MessageBar from "@/components/appbars/MessageBar";
import { setNewMessage } from "../../../../lib/redux/userSlice/UserReducer";

const ChatroomLayout = () => {
  const { selectedUser, currentUser, conversation, messages } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const room = selectedUser?.is_admin ? currentUser?.id : selectedUser?.id;
  // const [messages, setMessages] = useState([]);
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
      console.log(data);
      if (data?.success) {
        dispatch(setNewMessage(data?.newMessage));
      } else {
        console.error("Failed: ", data);
      }
    });
    return () => {
      socketio.off("newMessage");
    };
  }, [selectedUser]);
  return (
    <div className="flex flex-col h-screen w-full">
      <ChatHeader />
      <div className="flex flex-grow flex-col w-full overflow-auto no-scrollbar">
        {messages &&
          messages.length > 0 &&
          messages.map(
            (data, i) =>
              data.conversation_id === room &&
              (data?.sender_id === currentUser?.id ? (
                <SelfMessage message={data} key={i} index={i} />
              ) : (
                <ReceivedMessage message={data} key={i} index={i} />
              ))
          )}
      </div>
      <MessageBar
        setMsgInput={setMsgInput}
        msgInput={msgInput}
        handleMessage={handleMessage}
      />
    </div>
  );
};

export default ChatroomLayout;
