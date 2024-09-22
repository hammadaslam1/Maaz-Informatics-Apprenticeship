import { Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { downloadMedia, formatDate } from "../../../utils/CommonUtils";
const MediaMessage = ({ message }) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        style={{ width: 300, height: "100%", objectFit: "cover" }}
        src={message?.text}
        alt={message?.text}
      />
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
    </div>
  );
};

export default MediaMessage;
