/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import socketio from "@/app/socketio";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { PiChatTeardropTextFill } from "react-icons/pi";
import MoreIcon from "@mui/icons-material/MoreVert";
import ConversationButton from "@/components/buttons/ConversationButton";
import {
  setOtherUsers,
  signoutSuccess,
} from "../../../../lib/redux/userSlice/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddUserModal from "@/components/modals/AddUserModal";

const AllUsers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser, selectedUser, otherUsers } = useSelector(
    (state) => state.user
  );
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const settings = [
    currentUser?.full_access && {
      label: "Add User",
      onClick: () => {
        setOpen(false);
        setAddUserModalOpen(true);
      },
    },
    {
      label: "Logout",
      onClick: () => handleLogout(),
    },
  ].filter(Boolean);

  const handleLogout = () => {
    setOpen(false);
    dispatch(signoutSuccess());
    router.push("/");
    if (Notification.permission === "granted") {
      const notification = new Notification("Logout!", {
        body: `You are logged out Successfully!`,
      });
    } else {
      Notification.requestPermission();
    }
    router.replace("/");
  };
  useEffect(() => {
    socketio.emit("adminOnline");
  }, []);
  return (
    <Box className="flex flex-col h-screen w-full no-scrollbar">
      <Box className=" w-full h-16 flex justify-center items-center bg-[#23022e] text-white">
        <PiChatTeardropTextFill size={"40px"} />
        <h1 className="text-3xl">&nbsp;Chat App</h1>
      </Box>
      <Box className=" w-full h-16 flex bg-[#573280] text-white">
        <Box className="h-full  aspect-square flex justify-center items-center">
          <Avatar src="" className="h-10 w-10" />
        </Box>
        <Typography
          variant="body1"
          className="h-full  overflow-hidden flex-grow flex pl-1 text-nowrap items-center"
        >
          {currentUser?.name}
        </Typography>
        <Box className="h-full aspect-auto flex justify-center items-center">
          <IconButton
            className="h-10 w-10 rounded-full"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setOpen(true);
            }}
          >
            <MoreIcon className="text-white text-3xl" />
          </IconButton>
          <Menu
            className="mt-7"
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={() => setOpen(false)}
          >
            {settings.map((setting, i) => (
              <MenuItem
                key={i}
                onClick={setting?.onClick}
                sx={{
                  "&:hover": {
                    bgcolor: "#23022e",
                    color: "#fff",
                  },
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {setting?.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box className="h-px bg-gray-500"></Box>
      <Box className=" flex-grow overflow-auto no-scrollbar">
        {otherUsers && otherUsers.length > 0 ? (
          otherUsers.map(
            (user, i) =>
              user.id !== currentUser?.id && (
                <Box key={i} className="flex">
                  <ConversationButton user={user} me={currentUser} />
                </Box>
              )
          )
        ) : (
          <Box className="flex flex-grow justify-center items-center">
            <Typography variant="h6" className="text-[#cecfc7] font-bold">
              No user has joined
            </Typography>
          </Box>
        )}
      </Box>
      <AddUserModal setOpen={setAddUserModalOpen} open={addUserModalOpen} />
    </Box>
  );
};

export default AllUsers;
