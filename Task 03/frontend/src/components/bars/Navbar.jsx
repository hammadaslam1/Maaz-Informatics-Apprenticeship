import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ADDADDRESS, ADDSTUDENT, HOME } from "../../router/Routes";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar component="nav" position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: '#333'
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">Student Management</Typography>
        </Box>
        <Box sx={{}}>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              m: 1,
              textTransform: "capitalize",
              "&:hover": {
                border: "2px solid #fff",
                backgroundColor: "#fff",
                color: "#333",
              },
            }}
            onClick={() => navigate(HOME)}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              m: 1,
              textTransform: "capitalize",
              "&:hover": {
                border: "2px solid #fff",
                backgroundColor: "#fff",
                color: "#333",
              },
            }}
            onClick={() => navigate(ADDSTUDENT)}
          >
            Add Student
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              m: 1,
              textTransform: "capitalize",
              "&:hover": {
                border: "2px solid #fff",
                backgroundColor: "#fff",
                color: "#333",
              },
            }}
            onClick={() => navigate(ADDADDRESS)}
          >
            Add Address
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
