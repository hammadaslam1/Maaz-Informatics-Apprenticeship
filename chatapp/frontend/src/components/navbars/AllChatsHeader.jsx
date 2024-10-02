import ToggleButton from "../buttons/ToggleButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchConversation from "../inputs/SearchConversation";
import { AppBar, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/userReducer/UserReducer";
import { setConversationClosed } from "../../redux/userReducer/ConversationReducer";
import socket from "../../socket.js";
const AllChatsHeader = () => {
  const dispatch = useDispatch();
  return (
    <>
      <AppBar
        sx={{
          height: "10%",
          boxShadow: "unset",
          position: "unset",
          backgroundColor: "#ededed",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
            <ToggleButton
              name={"Hammad Aslam"}
              variant={"avatar"}
              onClick={() => {
                dispatch(setConversationClosed());
                dispatch(signoutSuccess());
              }}
              // disableRipple
            />
          </div>
          <div>
            <ToggleButton
              icon={<ChatIcon />}
              variant={"icon"}
              onClick={() => {
                //   alert("hammad aslam");
              }}
            />
            <ToggleButton
              icon={<MoreVertIcon />}
              variant={"icon"}
              onClick={() => {
                //   alert("hammad aslam");
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <SearchConversation />
    </>
  );
};

export default AllChatsHeader;
