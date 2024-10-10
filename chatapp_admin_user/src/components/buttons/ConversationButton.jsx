"use client";

import { Avatar, Badge, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversation,
  setConversationSelected,
} from "../../../lib/redux/userSlice/UserReducer";
import socketio from "@/app/socketio";

const ConversationButton = ({ user, me }) => {
  const [count, setCount] = useState(1);
  const { selectedUser, conversation } = useSelector((state) => state.user);
  const [lastMessage, setLastMessage] = useState("");
  const dispatch = useDispatch();

  const createConversation = async () => {
    socketio.emit("joinConversation", {
      user_id: selectedUser?.is_admin ? me?.id : user?.id,
      admin_id: selectedUser?.is_admin ? user?.id : me?.id,
      id: me?.id,
    });
    dispatch(setConversationSelected(user));
    socketio.on("conversationJoined", (data) => {
      if (data?.success) {
        dispatch(setConversation(data?.conversation));
        // setLastMessage(data.lastMessage);
      } else {
        console.error("Failed: ", data?.message);
      }
    });
  };
  return (
    <button
      key={user?.id}
      className="w-full h-16 flex items-center transition-all hover:bg-[#eff8e2] active:bg-[#cecfc7] focus:bg-[#cecfc7] focus:border-r-[3px] border-[#23022e]"
      onClick={createConversation}
    >
      <div className=" h-full aspect-square flex justify-center items-center">
        <Avatar src="" />
      </div>
      <div className=" flex flex-col gap-2 flex-grow overflow-hidden">
        <Typography variant="body2" className=" w-full text-left">
          {user?.name}
        </Typography>
        {/* {conversation && (
          <>
            <Typography
              variant="body2"
              className=" text-left text-nowrap overflow-hidden"
            >
              {conversation?.last_message}
            </Typography>
          </>
        )} */}
      </div>
      {/* {count && count > 0 && (
        <div className=" h-full w-fit p-4 flex justify-center items-center">
          <Badge badgeContent={count} />
        </div>
      )} */}
    </button>
  );
};

export default ConversationButton;
