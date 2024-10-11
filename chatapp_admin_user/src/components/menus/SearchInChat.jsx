import { Menu, MenuItem, Typography } from "@mui/material";

const SearchInChat = ({ anchorEl, open, setOpen }) => {
  return (
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
      <MenuItem
        sx={{
          "&:hover": {
            bgcolor: "#23022e",
            color: "#fff",
          },
        }}
      ></MenuItem>
    </Menu>
  );
};

export default SearchInChat;
