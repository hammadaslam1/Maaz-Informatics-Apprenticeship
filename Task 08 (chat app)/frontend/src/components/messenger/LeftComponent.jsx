import { Box } from "@mui/material";
import AllChatsHeader from "../navbars/AllChatsHeader";
const LeftComponent = () => {
  return (
    <Box>
      <Box sx={{ height: "110px" }}>
        <AllChatsHeader />
      </Box>
    </Box>
  );
};

export default LeftComponent;
