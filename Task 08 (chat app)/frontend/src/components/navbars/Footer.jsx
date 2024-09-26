/* eslint-disable react-hooks/exhaustive-deps */
import { Box, InputBase } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import ToggleButton from "../buttons/ToggleButton";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
const Footer = ({ sendText, value, setValue, setFile, file, setImage, sendMessage }) => {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  // const getImage = async () => {
  //   if (file) {
  //     const data = new FormData();
  //     // data.append("type", 'type');
  //     data.append("text", file);

  //     fetch('http://localhost:3001/api/message/upload', {
  //       method: 'POST',
  //       body: data,
  //     }).then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error("Failed to upload image");
  //       }
  //     }).then((data) => setValue(`http://192.168.2.189:3001/${data.path}`))
  //     // setImage(response.data);
  //   }
  // }
  const onFileChange = (e) => {
    setValue(e.target.files[0].name);
    setFile(e.target.files[0]);
  }

  // useEffect(() => {
  //   getImage();
  // }, [file])
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
        onChange={(e) => onFileChange(e)}
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
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => sendText(e)}
          value={value}
        />
      </Box>
      {value?.length > 0 ? (
        <ToggleButton icon={<SendIcon />} onClick={() => sendMessage()} variant={"icon"} />
      ) : (
        <ToggleButton icon={<MicIcon />} variant={"icon"} />
      )}
    </Box>
  );
};

export default Footer;
