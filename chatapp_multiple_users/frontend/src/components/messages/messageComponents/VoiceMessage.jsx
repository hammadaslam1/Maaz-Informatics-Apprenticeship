import { Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { downloadMedia, formatDate } from "../../../utils/CommonUtils";
import useSound from 'use-sound'
const VoiceMessage = ({ message }) => {
    const [playSound] = useSound(message?.text);
    return (
        <div style={{ position: "relative" }}>
            <audio controls>
                <source src={message?.text} type="audio/wav" />
                <source src={message?.text} type="audio/mpeg" />
                <source src={message?.text} type="audio/mp3" />
                <source src={message?.text} type="audio/aac" />
                {/* <source src={message?.text} type="audio/aac" /> */}
                Your browser does not support the audio element.
            </audio>

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
                {/* <GetAppIcon
                    onClick={(e) => downloadMedia(e, message?.text)}
                    fontSize="small"
                    style={{
                        marginRight: 10,
                        border: "1px solid grey",
                        borderRadius: "50%",
                    }}
                /> */}
                {formatDate(message?.createdAt)}
            </Typography>
        </div>
    );
};

export default VoiceMessage;
