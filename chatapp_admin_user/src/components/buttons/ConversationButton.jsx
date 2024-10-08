"use client";

import { Avatar, Badge, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversationSelected } from "../../../lib/redux/userSlice/UserReducer";

const ConversationButton = ({ user, me }) => {
  const [count, setCount] = useState(1);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const createConversation = async () => {
    if (selectedUser?.id !== user?.id) {
      // socket.emit("newConversation", {
      //   senderId: me?._id,
      //   receiverId: user?._id,
      // });
      console.log(selectedUser)
    }
    dispatch(setConversationSelected(user));
    // socket.emit("seenAllMessages", {
    //   conversationId: conversation?._id,
    //   receiverId: user?._id,
    //   senderId: me?._id,
    // });
  };
  return (
    <button
      key={user?.id}
      className="w-full h-16 flex items-center transition-all hover:bg-[#eff8e2] active:bg-[#cecfc7] focus:bg-[#cecfc7] focus:border-r-[3px] border-[#23022e]"
      onClick={createConversation}
    >
      <div className="h-full aspect-square flex justify-center items-center">
        <Avatar src="" />
      </div>
      <Typography variant="body2" className="flex flex-grow">
        {user?.name}
      </Typography>
      {count && count > 0 && (
        <div className="h-full w-fit p-4 flex justify-center items-center">
          <Badge badgeContent={count} className="text-3xl" color="#23022e" />
        </div>
      )}
    </button>
  );
};

export default ConversationButton;
