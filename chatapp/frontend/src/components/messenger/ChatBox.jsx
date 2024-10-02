/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import ChatHeader from "../navbars/ChatHeader";
import AllMessages from "../messages/AllMessages";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const server_url = process.env.REACT_APP_SERVER_URL;
// const socket = io(server_url);
const ChatBox = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { selectedUser } = useSelector((state) => state.conversation);
  const [conversation, setConversation] = useState({});

  const getConversation = () => {
    fetch(`${server_url}/api/conversation/get`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: currentUser?.user?._id,
        receiverId: selectedUser?._id,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setConversation(data);
        });
      }
    });
  };
  useEffect(() => {
    getConversation();
  }, [selectedUser]);
  return (
    <Box sx={{}}>
      <ChatHeader person={selectedUser} />
      <AllMessages person={selectedUser} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;
