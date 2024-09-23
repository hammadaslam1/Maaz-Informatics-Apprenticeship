/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setConversationSelected } from "../../redux/userReducer/ConversationReducer";
import { formatDate } from "../../utils/CommonUtils";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
const ConversationButton = ({ user, me }) => {
  const [name, setName] = useState("Hammad Aslam");
  const [message, setMessage] = useState({});
  const dispatch = useDispatch()

  const getUser = async () => {
    dispatch(setConversationSelected(user))
    fetch('http://localhost:3001/api/conversation/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId: me._id, receiverId: user._id }),
    })
  }
  useEffect(() => {
    socket.emit("getConversation", { senderId: me._id, receiverId: user._id })
    socket.on("receiveConversation", (data) => {
      setMessage({ text: data?.message, timestamp: data?.updatedAt })
    })
    return () => {
      socket.off("receiveConversation")
      socket.off("getConversation")
    }
  }, [])
  return (
    <Button
      sx={{
        width: '100%',
        height: "65px",
        display: "flex",
        padding: "13px 0 13px 13px",
        cursor: "pointer",
        textTransform: 'capitalize',
        color: '#000'
      }}
      onClick={() => getUser()}
    >
      <Box>
        <Avatar src="" children={`${name.split(" ")[0][0]}`} />
      </Box>
      <Box style={{ width: "100%", paddingLeft: '13px' }}>
        <Box sx={{ display: "flex" }}>
          <Typography>{user?.name}</Typography>
          {message?.text && (
            <Typography
              sx={{
                fontSize: "12px",
                marginLeft: "auto",
                color: "#00000099",
                marginRight: "20px",
              }}
            >
              {formatDate(message?.timestamp)}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            sx={{
              display: "block",
              color: "rgba(0,0,0,0.6)",
              fontSize: "14px",
            }}
          >
            {message?.text?.includes("localhost") ? "media" : message.text}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

export default ConversationButton;
