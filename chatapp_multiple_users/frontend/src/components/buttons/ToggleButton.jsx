/* eslint-disable eqeqeq */
import { Avatar, IconButton } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}
const itemHandler = (props) => {
  if (props.variant == "icon") {
    return props.icon;
  } else if (props.variant == "avatar") {
    const username = props?.name;
    return <Avatar {...stringAvatar(username)} />;
  }
};
const ToggleButton = (props) => {
  return (
    <IconButton
      sx={{ p: 0, height: "40px", width: "40px" }}
      onClick={props.onClick}
      {...props}
    >
      {itemHandler(props)}
    </IconButton>
  );
};

export default ToggleButton;
