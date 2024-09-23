import { Box, Divider } from "@mui/material";
import AllChatsHeader from "../navbars/AllChatsHeader";
import { useEffect, useState } from "react";
import ConversationButton from "../buttons/ConversationButton";
import { useSelector } from "react-redux";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
const LeftComponent = () => {
  const [users, setUsers] = useState(null);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    socket.on('getAllUsers', (data) => {
      setUsers(data);
    })
    return () => {
      socket.off('getAllUsers')
    }
  }, []);
  return (
    <Box>
      <Box sx={{ height: "110px" }}>
        <AllChatsHeader />
        <Box sx={{ overflow: "overlay", height: "81vh" }}>
          {users &&
            users.map(
              (user, i) =>
                user._id !== currentUser?.user._id && (
                  <>
                    <ConversationButton user={user} me={currentUser.user} />
                    {users.length !== i + 1 && (
                      <Divider
                        sx={{
                          margin: "0 0 0 70px",
                          backgroundColor: "#e9edef",
                          opacity: "0.6",
                        }}
                      />
                    )}
                  </>
                )
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default LeftComponent;
