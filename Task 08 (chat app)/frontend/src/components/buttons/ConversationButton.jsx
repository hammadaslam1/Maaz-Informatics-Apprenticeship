/* eslint-disable no-unused-vars */
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";

const ConversationButton = ({ user }) => {
  const [name, setName] = useState("Hammad Aslam");
  const [message, setMessage] = useState({});

  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };
  return (
    <Box
      sx={{
        height: "45px",
        display: "flex",
        padding: "13px 0",
        cursor: "pointer",
      }}
    >
      <Box>
        <Avatar src="" children={`${name.split(" ")[0][0]}`} />
      </Box>
      <Box style={{ width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          <Typography>{user?.name}</Typography>
          {message?.text && (
            <Typography
              sx={{
                fontSize: "12px",
                marginLeft: "auto",
                color: "#00000099",
                marginRight: "20px",
              }}
            >
              {formatDate(message?.timestamp)}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            sx={{
              display: "block",
              color: "rgba(0,0,0,0.6)",
              fontSize: "14px",
            }}
          >
            {message?.text?.includes("localhost") ? "media" : message.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationButton;
