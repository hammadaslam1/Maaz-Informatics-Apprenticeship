/* eslint-disable react-hooks/exhaustive-deps */
import { Box, InputBase } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ToggleButton from "../buttons/ToggleButton";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';
const Footer = ({ sendText, value, setValue, setFile, setAudio, sendMessage, sendVoiceMessage }) => {
  const fileRef = useRef(null);

  const onFileChange = (e) => {
    setValue(e.target.files[0].name);
    setFile(e.target.files[0]);
  }
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
      sendVoiceMessage(url, 'audio')
    })

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