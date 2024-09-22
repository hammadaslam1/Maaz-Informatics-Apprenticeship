import { AppBar, Box, Toolbar } from "@mui/material";
import ChatDialog from "./ChatDialog";

const Messenger = () => {
  return (
    <Box sx={{ height: "100vh", backgroundColor: "#dcdcdc" }}>
      <AppBar
        sx={{ backgroundColor: "#00a884", height: "125px", boxShadow: "none" }}
      >
        <Toolbar />
      </AppBar>
      <ChatDialog />
    </Box>
  );
};

export default Messenger;
