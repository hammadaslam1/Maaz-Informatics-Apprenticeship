import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../router/Routes";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  if (!currentUser) {
    navigate(LOGIN);
  } else {
    return (
      <div>
        <Button variant="contained" color="success">Login</Button>
        <Button variant="contained" color="warning">Register</Button>
      </div>
    );
  }
};

export default Home;
