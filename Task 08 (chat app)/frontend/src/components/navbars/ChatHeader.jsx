/* eslint-disable no-unused-vars */
import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ToggleButton from "../buttons/ToggleButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
const ChatHeader = ({ person }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [isOnline, setOnline] = useState(false)
  const { selectedUser } = useSelector(state => state.conversation)
  const userId = person?._id

  useEffect(() => {
    socket.emit('userOnline', userId);

    socket.on('updateUserStatus', ({ onlineUsers }) => {
      const keys = Object.keys(onlineUsers)
      // alert(JSON.stringify(keys))
      const onlineStatus = Object.keys(onlineUsers).includes(selectedUser._id);
      setOnline(onlineStatus);
      setActiveUsers(onlineUsers);
    });

    // return () => {
    //   socket.off('updateUserStatus');
    // };
  }, [person]);
  return (
    <Box
      sx={{
        height: "44px",
        backgroundColor: "#ededed",
        display: "flex",
        padding: "8px 16px",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          width: "40px",
          height: "40px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <Box>
        <Typography sx={{ marginLeft: "12px" }}>{selectedUser?.name}</Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "rgba(0,0,0,0.6)",
            marginLeft: "12px",
          }}
        >
          {Object.keys(activeUsers).includes(selectedUser._id) ? "Online" : "Offline"}
        </Typography>
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        <ToggleButton icon={<SearchIcon />} variant={"icon"} />
        <ToggleButton icon={<MoreVertIcon />} variant={"icon"} />
      </Box>
    </Box>
  );
};

export default ChatHeader;
