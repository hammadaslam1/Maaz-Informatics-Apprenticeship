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
  const [newMessages, setNewMessages] = useState(me?.newChats);
  const [conversation, setConversation] = useState(null);
  const { selectedUser } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const createConversation = async () => {
    if (selectedUser?._id !== user?._id) {
      socket.emit("newConversation", {
        senderId: me?._id,
        receiverId: user?._id,
      });
    }
    dispatch(setConversationSelected(user));
    socket.emit("seenAllMessages", {
      conversationId: conversation?._id,
      receiverId: user?._id,
      senderId: me?._id,
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

  const getUser = async () => {
    fetch(`${server_url}/api/user/getuser/${me?._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNewMessages(data?.newChats);
      });
  };

  useEffect(() => {
    getConversation();
    getUser();
  }, [conversation]);
  useEffect(() => {
    const newChats = newMessages;
    const length = newChats?.filter((item) => item === user?._id).length;
    setMessageCount(length);
  }, [newMessages]);
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
      onClick={() => createConversation()}
    >
      <Box sx={{ height: "40px", width: "40px" }}>
        <Avatar src="" children={`${user.name.split(" ")[0][0]}`} />
      </Box>
      <Box style={{ flex: 1, paddingLeft: "13px" }}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ textAlign: "left" }}>{user?.name}</Typography>
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
              width: "130px",
              overflow: "hidden",
              textAlign: "left",
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
