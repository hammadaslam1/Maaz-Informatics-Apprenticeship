import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setConversationClosed } from "../../../lib/redux/userSlice/UserReducer";
const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="flex min-h-16 w-full items-center bg-[#ada8b6]">
      <div className="h-full w-fit flex justify-center items-center">
        <IconButton onClick={() => dispatch(setConversationClosed())}>
          <MdOutlineKeyboardBackspace />
        </IconButton>
      </div>
      <div className="h-full aspect-square flex justify-center items-center">
        <IconButton>
          <Avatar />
        </IconButton>
      </div>
      <div className="h-full flex flex-grow items-center font-semibold text-2xl">
        {selectedUser?.name}
      </div>
      <div className="h-full w-fit flex justify-center items-center">
        <IconButton>
          <Avatar />
        </IconButton>
      </div>
      <div className="h-full w-fit flex justify-center items-center">
        <IconButton>
          <Avatar />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatHeader;