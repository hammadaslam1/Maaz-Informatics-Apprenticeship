import { Box } from "@mui/material";
import MediaMessage from "./messageComponents/MediaMessage";
import TextMessage from "./messageComponents/TextMessage";
import DocumentMessage from "./messageComponents/DocumentMessage";
import VideoMessage from "./messageComponents/VideoMessage";
import VoiceMessage from "./messageComponents/VoiceMessage";

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
      {message?.type === "image" ? (
        <MediaMessage message={message} />
      ) : message?.type === "video" ? (
        <VideoMessage message={message} />
      ) : message?.type === "application" ? (
        <DocumentMessage message={message} />
      ) : message?.type === "audio" ? (
        <VoiceMessage message={message} />
      ) : message?.type === "text" ? (
        <TextMessage message={message} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default SelfMessage;
