import { Box } from "@mui/material";
import ChatHeader from "../navbars/ChatHeader";
import AllMessages from "../messages/AllMessages";

const ChatBox = () => {
  return (
    <Box sx={{ height: "75%" }}>
      <ChatHeader />
      <AllMessages />
    </Box>
  );
};

export default ChatBox;
