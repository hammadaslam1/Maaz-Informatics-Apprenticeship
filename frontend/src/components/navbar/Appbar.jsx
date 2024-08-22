import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedOut } from "../../redux/userReducer/UserReducer";
import { ADDNEW, LOGIN, MAINPAGE } from "../../router/Routes";

const Appbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.user);
  const handleSignout = async () => {
    try {
      await fetch("http://localhost:3002/api/auth/signout", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(setLoggedOut());
            navigate(LOGIN);
          }
        })
        .catch(() => {
          alert("signout failed");
        });
    } catch (error) {
      alert("some problem");
    }
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={MAINPAGE}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MHA Blogs
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              //   onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white" }}
            >
              Blogs
            </Button>
            <Button
              color="success"
              onClick={() => navigate(ADDNEW)}
              sx={{ my: 2, color: "white" }}
            >
              Add New
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained" color="error" onClick={handleSignout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
