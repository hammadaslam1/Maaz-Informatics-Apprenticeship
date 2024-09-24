import { Typography } from "@mui/material";
import { formatDate } from "../../../utils/CommonUtils";

const TextMessage = ({ message }) => {

  return (
    <>
      <Typography sx={{ fontSize: "14px", padding: "0 25px 0 5px" }}>
        {message?.text}
      </Typography>
      <Typography
        sx={{
          fontSize: "10px",
          color: "#919191",
          marginTop: "6px",
          wordBreak: "keep-all",
        }}
      >
        {formatDate(message?.createdAt)}
      </Typography>
    </>
  );
};

export default TextMessage;
