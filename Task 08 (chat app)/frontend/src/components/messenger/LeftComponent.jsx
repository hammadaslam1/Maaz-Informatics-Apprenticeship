import { Box, Divider } from "@mui/material";
import AllChatsHeader from "../navbars/AllChatsHeader";
import { useEffect, useState } from "react";
import ConversationButton from "../buttons/ConversationButton";

import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
const LeftComponent = () => {
  const [users, setUsers] = useState(null);
  const { currentUser } = useSelector(state => state.user)
  // const {conversation} = useSelector(state => state.conversation)
  const [conversation, setConversation] = useState(null)
  const dispatch = useDispatch()

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
      <Box sx={{ height: 'calc(100vh - 30px)' }}>
        <AllChatsHeader />
        <Box sx={{ overflowY: 'auto', height: '77vh' }}>
          {users && users.length > 0 &&
            users.map(
              (user, i) =>
                user?._id !== currentUser?.user?._id && (
                  <div key={i}>
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
                  </div>
                )
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default LeftComponent;
