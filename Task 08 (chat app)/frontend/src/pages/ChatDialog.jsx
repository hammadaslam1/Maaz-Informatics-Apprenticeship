import { Box, Dialog } from "@mui/material";
import LeftComponent from "../components/messenger/LeftComponent";
import RightComponent from "../components/messenger/RightComponent";

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
  return (
    <Dialog
      open={true}
      slotProps={{
        backdrop: {
          style: { backgroundColor: "unset" },
        },
      }}
      PaperProps={{ sx: dialogStyle }}
    >
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ minWidth: "250px", flex: 1 }}>
          <LeftComponent />
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
