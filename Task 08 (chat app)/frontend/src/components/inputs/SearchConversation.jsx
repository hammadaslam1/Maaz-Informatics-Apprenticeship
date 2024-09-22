import { Box, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
const SearchConversation = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "50px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #f2f2f2",
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: "50px",
          backgroundColor: "#f0f2f5",
          margin: "0 13px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            color: "#919191",
            padding: "8px",
            height: "100%",
            position: "absolute",
          }}
        >
          <SearchIcon fontSize="small" />
        </Box>
        <InputBase
          sx={{
            width: "100%",
            padding: "16px",
            pl: "35px",
            fontSize: "14px",
            height: "15px",
            width: "100%",
          }}
          placeholder="Search or start new chat"
        />
      </Box>
    </Box>
  );
};

export default SearchConversation;
