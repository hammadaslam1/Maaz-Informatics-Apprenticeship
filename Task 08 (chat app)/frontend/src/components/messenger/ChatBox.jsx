/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import ChatHeader from "../navbars/ChatHeader";
import AllMessages from "../messages/AllMessages";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
const ChatBox = () => {
  const { currentUser } = useSelector(state => state.user)
  const { selectedUser } = useSelector(state => state.conversation)
  const [conversation, setConversation] = useState({});

  const getConversation = () => {
    fetch('http://localhost:3001/api/conversation/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId: currentUser?.user._id, receiverId: selectedUser._id }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setConversation(data);
        })
      }
    })
  }
  useEffect(() => {

    // socket.emit("getConversation", { senderId: currentUser?.user._id, receiverId: selectedUser._id })
    // socket.on("receiveConversation", (data) => {
    //   setConversation(data);
    // })
    getConversation()
    // return () => {
    //   socket.off("receiveConversation")
    // }
  }, [selectedUser]);
  return (
    <Box sx={{}}>
      <ChatHeader person={selectedUser} />
      <AllMessages person={selectedUser} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;
