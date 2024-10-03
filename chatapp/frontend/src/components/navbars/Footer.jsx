/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  CardMedia,
  Fade,
  InputBase,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ToggleButton from "../buttons/ToggleButton";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { io } from "socket.io-client";

const server_url = process.env.REACT_APP_SERVER_URL;
const socket = io(server_url);
const Footer = ({
  sendText,
  value,
  setValue,
  setFile,
  setAudio,
  sendMessage,
  sendVoiceMessage,
  file,
  setEmoji,
}) => {
  const fileRef = useRef(null);
  const [open, setOpen] = useState(false);

  const onFileChange = async (e) => {
    const { files } = e.target;
    const formData = new FormData();
    formData.append("text", files[0]);
    setValue(files[0].name);
    // setFile(files[0]);
    await fetch(`${server_url}/api/message/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // alert(data.path);
        setFile(`/${data.path}`);
        setOpen(true);
      })
      .catch((error) => alert(error));
  };
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const addAudioElement = (blob) => {
    convertFileToBase64(blob).then((url) => {
      sendVoiceMessage(url, "audio");
    });
  };
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
      <ToggleButton
        icon={
          // <EmojiEmotionsIcon
          //   sx={{
          //     color: "#ffbb00",
          //     filter: "drop-shadow(0 0 2px #6e6e6e)",
          //   }}
          // />
          <img
            src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f600.png"
            alt=""
            className="w-7 aspect-square"
          />
        }
        variant={"icon"}
        onClick={() => setEmoji((prev) => !prev)}
      />
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
        <ToggleButton
          icon={<SendIcon />}
          onClick={() => sendMessage()}
          variant={"icon"}
        />
      ) : (
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={false}
          downloadFileExtension="wav"
        />
      )}
    </Box>
  );
};

export default Footer;
