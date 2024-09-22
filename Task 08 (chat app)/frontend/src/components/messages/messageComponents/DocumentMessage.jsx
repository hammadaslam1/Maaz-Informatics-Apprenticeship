import { Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { downloadMedia, formatDate } from "../../../utils/CommonUtils";
import FilePresentIcon from "@mui/icons-material/FilePresent";

const DocumentMessage = ({ message }) => {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        {/* <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} /> */}
        <FilePresentIcon style={{ width: 80, height: 80, marginLeft: 10 }} />
        <Typography style={{ fontSize: 14 }}>
          {message?.text.split("/").pop()}
        </Typography>
      </div>
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

export default DocumentMessage;
