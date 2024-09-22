import { Typography } from "@mui/material";

const TextMessage = ({ message }) => {
  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };
  return (
    <>
      <Typography sx={{ fontSize: "14px", padding: "0 25px 0 5px" }}>
        {message?.text}
      </Typography>
      <Typography
        sx={{
          fontSize: "10px",
          color: "#919191",
        //   marginTop: "6px",
          wordBreak: "keep-all",
          marginTop: "auto",
        }}
      >
        {formatDate(message?.createdAt)}
      </Typography>
    </>
  );
};

export default TextMessage;
