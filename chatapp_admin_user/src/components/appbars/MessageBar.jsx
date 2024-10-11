import { Fab, TextField } from "@mui/material";
import { FloatButton, Input } from "antd";
import { MdOutlineKeyboardBackspace, MdOutlineMoreVert } from "react-icons/md";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { MdEmojiEmotions, MdKeyboardVoice } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
const MessageBar = () => {
  return (
    <div className="flex min-h-14 max-h-40 w-full items-end bg-[#eff8e2]">
      <div className="h-14 w-fit flex justify-center items-center mx-1">
        <Fab
          size="small"
          sx={{
            boxShadow: "none",
            bgcolor: "transparent",
            "&:hover": {
              boxShadow: "none",
              bgcolor: "#cecfc7",
            },
          }}
        >
          <MdEmojiEmotions fontSize={28} className="text-[#23022e]" />
        </Fab>
      </div>
      <div className="h-14 w-fit flex justify-center items-center mx-1">
        <Fab
          size="small"
          sx={{
            boxShadow: "none",
            bgcolor: "transparent",
            "&:hover": {
              boxShadow: "none",
              bgcolor: "#cecfc7",
            },
          }}
        >
          <GrAttachment fontSize={24} className="text-[#23022e]" />
        </Fab>
      </div>
      {/* <div className="h-full w-2"></div> */}
      <div className="h-full flex flex-grow items-center overflow-hidden">
        <Input variant="borderless" className="min-h-14 max-h-40" />
      </div>
      <div className="h-14 w-fit flex justify-center items-center mx-1">
        <Fab
          size="small"
          sx={{
            boxShadow: "none",
            bgcolor: "transparent",
            "&:hover": {
              boxShadow: "none",
            //   bgcolor: "#cecfc7",
            },
          }}
        >
          <IoSend fontSize={28} className="text-[#23022e]" />
        </Fab>
      </div>
      <div className="h-14 w-fit flex justify-center items-center mx-1">
        <Fab
          size="small"
          sx={{
            boxShadow: "none",
            bgcolor: "transparent",
            "&:hover": {
              boxShadow: "none",
              bgcolor: "#cecfc7",
            },
          }}
        >
          <MdKeyboardVoice fontSize={28} className="text-[#23022e]" />
        </Fab>
      </div>
    </div>
  );
};

export default MessageBar;
