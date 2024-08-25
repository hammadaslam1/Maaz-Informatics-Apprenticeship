export const styles = {
  avatar: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 50,
    width: 130,
    height: 130,
    border: "5px solid #e6e6e6",
    transition: "all 0.2s ease-in-out",
    "&:hover .icon-button": {
      backgroundColor: "#777d",
      transform: "translateY(0px)",
    },
    "&:hover .edit-icon": {
      position: "unset",
      transform: "translateY(0px)",
      fontSize: 48,
    },
  },
  iconButton: {
    width: "100%",
    height: "100%",
    fontSize: 30,
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#777",
    transition: "all 0.5s ease-in-out",
    transform: "translateX(280px)",
    transform: "translateY(100px)",
    zIndex: 99,
    position: "relative",
    "&:hover": {},
  },
};
