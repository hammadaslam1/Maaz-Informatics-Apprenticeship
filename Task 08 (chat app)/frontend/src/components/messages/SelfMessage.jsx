import { Box } from "@mui/material";
import MediaMessage from "./messageComponents/MediaMessage";
import TextMessage from "./messageComponents/TextMessage";
import DocumentMessage from "./messageComponents/DocumentMessage";

const SelfMessage = ({ message }) => {
  return (
    <Box
      sx={{
        background: "#dcf8c6",
        padding: "5px",
        maxWidth: "60%",
        width: "fit-content",
        marginLeft: "auto",
        display: "flex",
        borderRadius: "10px",
        wordBreak: "break-word",
      }}
    >
      {message?.type === "media" ? (
        <MediaMessage message={message} />
      ) : message?.type === "document" ? (
        <DocumentMessage message={message} />
      ) : message?.type === "text" ? (
        <TextMessage message={message} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default SelfMessage;
