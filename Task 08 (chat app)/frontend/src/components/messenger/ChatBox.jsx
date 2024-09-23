import { Box } from "@mui/material";
import ChatHeader from "../navbars/ChatHeader";
import AllMessages from "../messages/AllMessages";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChatBox = () => {
  const { currentUser } = useSelector(state => state.user)
  const { selectedUser } = useSelector(state => state.conversation)
  const [conversation, setConversation] = useState({});
  const conversationId = [currentUser._id, selectedUser._id].toSorted().join('')
  const getConversation = async () => {
    fetch('http://localhost:3001/api/conversation/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId: currentUser.user._id, receiverId: selectedUser._id }),
    }).then((response) => {
      if (response.ok) {
        const data = response.json();
        setConversation(data);
      }
    })
  }
  useEffect(() => {

    getConversation();
  }, [selectedUser._id]);
  return (
    <Box sx={{ height: "75%" }}>
      <ChatHeader person={currentUser.user} />
      <AllMessages person={currentUser.user} receiver={selectedUser} conversationId={conversationId} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;
