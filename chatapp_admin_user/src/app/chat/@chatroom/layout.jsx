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
import EmojiBox from "@/components/displayBox/EmojiBox";

const ChatroomLayout = () => {
  const [emoji, setEmoji] = useState(false);
  const { selectedUser, currentUser, conversation, messages, otherUsers } =
    useSelector((state) => state.user);
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
      {emoji && (
        <div className="bg-[#dcf8c6] p-2 ml-4 z-55 absolute bottom-16 rounded-md">
          <EmojiBox setValue={setMsgInput} />
        </div>
      )}
      <MessageBar
        setMsgInput={setMsgInput}
        msgInput={msgInput}
        handleMessage={handleMessage}
        setEmoji={setEmoji}
      />
    </div>
  );
};

export default ChatroomLayout;
