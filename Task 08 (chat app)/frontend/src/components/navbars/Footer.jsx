import { Box, InputBase } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import ToggleButton from "../buttons/ToggleButton";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
const Footer = () => {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  return (
    <Box
      sx={{
        height: "55px",
        backgroundColor: "#ededed",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        "&>*": {
          margin: "5px",
          color: "#919191",
        },
      }}
    >
      <ToggleButton icon={<EmojiEmotionsIcon />} variant={"icon"} />
      <label htmlFor="fileInput">
        <ToggleButton
          icon={<AttachFileIcon sx={{ transform: "rotate(40deg)" }} />}
          variant={"icon"}
          onClick={() => fileRef.current.click()}
        />
      </label>
      <input
        type="file"
        id="fileInput"
        ref={fileRef}
        // onChange={(e) => onFileChange(e)}
        hidden
      />

      <Box
        sx={{
          borderRadius: "18px",
          backgroundColor: "#fff",
          width: "calc(94%-100px)",
        }}
      >
        <InputBase
          sx={{
            width: "100%",
            padding: "20px",
            paddingLeft: "25px",
            fontSize: "14px",
            height: "20px",
          }}
          placeholder="Type a message"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setMessage(e.target.value)}
          //   onKeyPress={(e) => sendText(e)}
          value={message}
        />
      </Box>
      {message?.length > 0 ? (
        <ToggleButton icon={<SendIcon />} variant={"icon"} />
      ) : (
        <ToggleButton icon={<MicIcon />} variant={"icon"} />
      )}
    </Box>
  );
};

export default Footer;
