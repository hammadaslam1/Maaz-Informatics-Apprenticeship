import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { HOME, LOGIN } from "../router/Routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../redux/userReducer/UserReducer";
import BlogCard from "../components/cards/BlogCard";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(null);
  const getBlogs = async () => {
    try {
      await fetch("http://localhost:3002/api/blogs/get-blogs").then(
        async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            setBlogs(data);
            setLoading(false);
          } else {
            alert("Failed to fetch blogs");
            setLoading(false);
          }
        }
      );
    } catch {
      alert("Failed to fetch blogs");
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h2" fontWeight={500}>
        Let's <strong style={{ color: "#1075ff" }}>Blog</strong> your stories
        and Experiences
      </Typography>
      <Box sx={{ display: "flex", gap: 10, py: 16, p: 10, flexWrap: "wrap" }}>
        {blogs && blogs.map((data, index) => <BlogCard key={index} data={data} />)}
      </Box>
    </Box>
  );
};

export default MainPage;
