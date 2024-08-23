export const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 80px",
    background: "#333",
    color: "#fff",
    position: "sticky",
    top: 0,
  },
  logoDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logoText: {
    mx: 3,
    fontFamily: "monospace",
    letterSpacing: "0.6rem",
  },
  links: {
    color: "#FFFFFF",
    textDecoration: "none",
    marginRight: 15,
    fontSize: "18px",
  },
  sidebar: {
    // position: "fixed",
    // top: 60,
    bottom: 0,
    // left: 0,
    // index: 1,
    width: "100%",
    height: "88vh",
    backgroundColor: "#333",
    color: "#fff",
    transition: "all 0.2s ease-in-out",
    transform: "translateX(-280px)",
    "&:hover": {
      transform: "translateX(0)",
    },
    // overflowY: "auto",
    p: 1,
  },
  sidebarInternal: {
    // p: 2,
    // m: 1,
    backgroundColor: "#444",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  buttons: {
    m: 1,
  },
};
