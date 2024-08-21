import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, MAINPAGE, REGISTER } from "../router/Routes";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const { loggedIn, loggedOut } = useSelector((state) => state.user);
  if (loggedIn) {
    navigate(MAINPAGE);
  } else if (loggedOut) {
    navigate(LOGIN);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
      }}
    >
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate(LOGIN)}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => navigate(REGISTER)}
      >
        Register
      </Button>
    </div>
  );
};

export default Home;
