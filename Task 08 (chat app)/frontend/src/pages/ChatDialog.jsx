/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Dialog } from "@mui/material";
import LeftComponent from "../components/messenger/LeftComponent";
import RightComponent from "../components/messenger/RightComponent";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { useSelector } from "react-redux";
const server_url = process.env.REACT_APP_SERVER_URL
const socket = io(server_url);
const dialogStyle = {
  height: "95%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

const ChatDialog = () => {
  const { currentUser } = useSelector(state => state.user)
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch(`${server_url}/api/user/getallusers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch users");
      }
    }).then((data) => setUsers(data))
  }, []);
  useEffect(() => {
    socket.emit('userOnline', currentUser._id);

    // socket.on('updateUserStatus', ({ onlineUsers }) => {
    //   // setActiveUsers(onlineUsers);
    //   // if (Object.keys(onlineUsers).includes(person?._id)) {
    //   //   fetch('http://localhost:3001/api/message/update-delivered', {
    //   //     method: 'POST',
    //   //     headers: { 'Content-Type': 'application/json' },
    //   //     body: JSON.stringify({ receiverId: currentUser?._id, senderId: person?._id }),
    //   //   })
    //   // }
    // });

  }, []);
  return (
    <Dialog
      open={true}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "unset" },
        },
      }}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
    >
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ minWidth: "250px", flex: 1 }}>
          <LeftComponent users={users} />
        </Box>
        <Box
          sx={{
            width: "73%",
            minWidth: "300px",
            flex: 3,
            height: "100%",
            borderLeft: "1px solid rgba(0,0,0,0.14)",
            // backgroundColor: "#0f0",
          }}
        >
          <RightComponent />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ChatDialog;
