import { CardActionArea, CardMedia, Modal, Typography } from "@mui/material";
import { downloadMedia, formatDate } from "../../../utils/CommonUtils";
import { useState } from "react";

const server_url = process.env.REACT_APP_SERVER_URL;
const MediaMessage = ({ message }) => {
  const [open, setOpen] = useState(false);
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
          height="100%"
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
        <Typography
          sx={{
            fontSize: "10px",
            color: "#919191",
            marginTop: "6px",
            wordBreak: "keep-all",
            width: "100%",
            textAlign: "right",
            position: "absolute",
            bottom: 0,
            right: 0,
            paddingRight: "3px",
            // textShadow: "0 0 15px #000",
          }}
        >
          {formatDate(message?.createdAt)}
        </Typography>
      </CardActionArea>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="h-screen flex justify-center items-center">
          <img
            className="h-[80vh] aspect-auto transition-all"
            src={server_url + message?.text}
            alt="media not available"
            style={{
              background: "linear-gradient(to top, #cccccc 0%, #ffffff 100%)",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MediaMessage;
