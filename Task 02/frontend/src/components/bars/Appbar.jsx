import { Link } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { styles } from "./BarStyles";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuIcon from "@mui/icons-material/Menu";

const Appbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoDiv}>
        <AutoAwesomeIcon fontSize={"large"} />
        <Typography variant="h6" component="span" sx={styles.logoText}>
          LOGO
        </Typography>
      </div>
      <div>
        <Link to="#" style={styles.links}>
          somewhere
        </Link>
        <Link to="#" style={styles.links}>
          somewhere
        </Link>
        <Link to="#" style={styles.links}>
          somewhere
        </Link>
      </div>
      <div>
        <IconButton>
          <MenuIcon sx={{color: '#fff'}} />
        </IconButton>
      </div>
    </nav>
  );
};

export default Appbar;
