import { CardActionArea, Modal, Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { downloadMedia, formatDate } from "../../../utils/CommonUtils";
import { useState } from "react";

const server_url = process.env.REACT_APP_SERVER_URL;
const VideoMessage = ({ message }) => {
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
        <video
          width="300"
          height="300"
          className="h-[300px] aspect-square object-center object-cover cursor-pointer"
        >
          <source src={server_url + message?.text} type="video/mp4" />{" "}
        </video>
        <Typography
          sx={{
            fontSize: "10px",
            color: "#919191",
            marginTop: "6px",
            wordBreak: "keep-all",
            //   marginTop: "auto",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <GetAppIcon
            onClick={(e) => downloadMedia(e, message?.text)}
            fontSize="small"
            style={{
              marginRight: 10,
              border: "1px solid grey",
              borderRadius: "50%",
            }}
          />
          {formatDate(message?.createdAt)}
        </Typography>
      </CardActionArea>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="h-screen flex justify-center items-center">
          <video
            className="h-[90vh] aspect-auto transition-all cursor-pointer"
            controls
          >
            <source src={server_url + message?.text} type="video/mp4" />
          </video>
        </div>
      </Modal>
    </div>
  );
};

export default VideoMessage;
