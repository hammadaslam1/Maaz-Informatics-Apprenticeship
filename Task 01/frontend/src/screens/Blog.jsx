import { useLocation, useNavigate } from "react-router-dom";
import { MAINPAGE } from "../router/Routes";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //   alert(JSON.stringify(location));
  const data = location.state;
  useEffect(() => {
    if (data == null) {
      navigate(MAINPAGE);
    }
  }, [location.state]);
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h2"
        fontWeight={600}
        sx={{ fontSize: "clamp(1.7rem, 4vw, 4.5rem)" }}
      >
        {data?.title}
      </Typography>
      <Box
        sx={{
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          my={3}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "60vw",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Author: <strong>{data?.author}</strong>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Published On: {new Date(data?.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Box>
          <img
            src={data?.image}
            style={{ height: "40vw", width: "auto" }}
            alt={data?.title}
          />
        </Box>

        <Typography variant="body1" fontStyle={"italic"} color="text.secondary">
          Tags: {data?.tags?.join(", ")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: "clamp(500px, 70vw, 1400px)",
            fontSize: "clamp(0.8rem, 1.5vw, 2.5rem)",
            textAlign: "justify",
          }}
        >
          {data?.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default Blog;
