import { Box, Button, Card } from "@mui/material";
import { styles } from "./BarStyles";

const Sidebar = () => {
  return (
    <Box sx={styles.sidebar}>
      <Card sx={styles.sidebarInternal}>
        <Box sx={styles.buttons}>
          <Button variant="contained" color="inherit" sx={{ width: "100%" }}>
            Show Data
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Sidebar;
