/* eslint-disable no-unused-vars */
import {
  CardActionArea,
  CardMedia,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import { downloadMedia, formatDate } from "../../../utils/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";

const server_url = process.env.REACT_APP_SERVER_URL;
const MediaMessage = ({ message }) => {
  const [open, setOpen] = useState(false);
  const { selectedUser } = useSelector((state) => state.conversation);
  const status = message?.status;
  return (
    <div style={{ position: "relative" }}>
      <CardActionArea
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
        // onClick={(e) => downloadMedia(e, message?.text)}
        onClick={() => setOpen(true)}
      >
        <CardMedia
          component="img"
          width={300}
          height={300}
          image={server_url + message?.text}
          alt="media not available"
          popovertarget="image"
          sx={{
            background: "linear-gradient(to top, #cccccc 0%, #ffffff 100%)",
            width: 300,
            height: 300,
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          {selectedUser?._id !== message.senderId && (
            <>
              {status === "sent" ? (
                <DoneIcon fontSize="xs" color="disabled" />
              ) : status === "delivered" ? (
                <DoneAllIcon fontSize="xs" color="disabled" />
              ) : status === "seen" ? (
                <DoneAllIcon fontSize="xs" color="primary" />
              ) : (
                <ErrorIcon fontSize="xs" color="error" />
              )}
            </>
          )}
          <Typography
            sx={{
              fontSize: "10px",
              color: "#919191",
              marginTop: "6px",
              wordBreak: "keep-all",
              marginRight: "5px",
            }}
          >
            {formatDate(message?.createdAt)}
          </Typography>
        </Box>
      </CardActionArea>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="h-screen flex justify-center items-center">
          <img
            className="h-[80vh] aspect-auto transition-all"
            src={server_url + message?.text}
            alt="media not available"
          />
        </div>
      </Modal>
    </div>
  );
};

export default MediaMessage;
