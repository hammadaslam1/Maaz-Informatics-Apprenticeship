/* eslint-disable no-unused-vars */
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import ToggleButton from "../buttons/ToggleButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
const ChatHeader = ({ person }) => {
  const [activeUsers, setActiveUsers] = useState([]);
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
        <Typography sx={{ marginLeft: "12px" }}>Hammad Aslam</Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "rgba(0,0,0,0.6)",
            marginLeft: "12px",
          }}
        >
          {activeUsers?.find((user) => user.sub === person.sub)
            ? "Online"
            : "Offline"}
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
