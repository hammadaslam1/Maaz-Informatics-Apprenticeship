import { AppBar, Box, Toolbar } from "@mui/material";
import ChatDialog from "./ChatDialog";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../router/Routes";

const Messenger = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(LOGIN);
    }
  });
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
