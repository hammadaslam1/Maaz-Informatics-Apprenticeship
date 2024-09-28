/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { Avatar, Badge, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversation,
  setConversationSelected,
} from "../../redux/userReducer/ConversationReducer";
import { formatDate } from "../../utils/CommonUtils";
import io from "socket.io-client";
const server_url = process.env.REACT_APP_SERVER_URL;
const socket = io(server_url);
const ConversationButton = ({ user, me }) => {
  const [name, setName] = useState("Hammad Aslam");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [conversation, setConversation] = useState(null);
  const { selectedUser } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(setConversationSelected(user));

    socket.emit("newConversation", {
      senderId: me?._id,
      receiverId: user?._id,
    });
  };
  const getConversation = async () => {
    fetch(`${server_url}/api/conversation/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId: me?._id, receiverId: user?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setConversation(data);
        setTime(data?.updatedAt);
        setMessage(data?.message);
      });
  };

  useEffect(() => {
    getConversation();
    socket.on("newMessage", (data) => {
      getConversation();
    });
  }, [conversation]);
  return (
    <Button
      sx={{
        width: "100%",
        height: "65px",
        display: "flex",
        padding: "13px 0 13px 13px",
        cursor: "pointer",
        textTransform: "capitalize",
        color: "#000",
      }}
      onClick={() => getUser()}
    >
      <Box>
        <Avatar src="" children={`${user.name.split(" ")[0][0]}`} />
      </Box>
      <Box style={{ width: "100%", paddingLeft: "13px" }}>
        <Box sx={{ display: "flex" }}>
          <Typography>{user?.name}</Typography>
          {conversation && (
            <Typography
              sx={{
                fontSize: "12px",
                marginLeft: "auto",
                color: "#00000099",
                marginRight: "20px",
              }}
            >
              {formatDate(time)}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              display: "block",
              color: "rgba(0,0,0,0.6)",
              fontSize: "14px",
            }}
          >
            {message}
          </Typography>
          <Badge
            sx={{
              fontSize: "12px",
              marginLeft: "auto",
              color: "#00000099",
              marginRight: "40px",
              margin: "10px 40px auto auto",
            }}
            badgeContent={messageCount}
            color="primary"
          ></Badge>
        </Box>
      </Box>
    </Button>
  );
};

export default ConversationButton;
