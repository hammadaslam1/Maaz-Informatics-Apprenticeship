import ToggleButton from "../buttons/ToggleButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchConversation from "../inputs/SearchConversation";
import { AppBar, Toolbar } from "@mui/material";

const AllChatsHeader = () => {
  return (
    <>
      <AppBar
        sx={{
          height: "60px",
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
                // alert("hammad aslam");
              }}
              disableRipple
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
