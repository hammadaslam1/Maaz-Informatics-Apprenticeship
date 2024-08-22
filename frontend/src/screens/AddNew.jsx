import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AddNew = () => {
  //   const [form, setForm] = useState({
  //     title: "",
  //     content: "",
  //     author: "",
  //     email: "",
  //     tags: "",
  //     image: "",
  //   });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: "800px", minWidth: "700px" }} elevation={10}>
        <div>
          <Typography
            variant="h4"
            sx={{ color: "#282828", m: 6, fontWeight: "600" }}
          >
            Add new <strong style={{ color: "#1075ff" }}>Blog</strong>
          </Typography>
          <form style={{ padding: "0 30px 30px 30px" }}>
            <fieldset
              style={{
                border: "none",
                display: "grid",
                gridTemplateColumns: "repeat(2, 5fr)",
                gap: "25px 15px",
              }}
            >
              <TextField
                id="outlined-textarea"
                label="Blog Title"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <TextField
                id="outlined-textarea"
                label="Author"
                placeholder="Enter your name"
                //   value={author}
                //   onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <TextField
                id="outlined-textarea"
                label="Author"
                placeholder="Enter your email"
                //   value={email}
                //   onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <TextField
                id="outlined-textarea"
                label="Tags"
                placeholder="Enter tags here"
                //   value={tags}
                //   onChange={(e) => {
                //     setTags(e.target.value);
                //   }}
              />
              <TextField
                id="outlined-textarea"
                type="url"
                label="Image URL"
                placeholder="https://image.png"
                //   value={image}
                //   onChange={(e) => setImage(e.target.value)}
                sx={{ gridColumn: "1/3" }}
              />
              <TextField
                id="outlined-textarea"
                label="Blog"
                placeholder="Enter your blog"
                //   value={blog}
                //   onChange={(e) => setBlog(e.target.value)}
                multiline
                minRows={5}
                sx={{ gridColumn: "1/3" }}
                required
              />
              <Button
                variant="contained"
                sx={{
                  gridColumn: "1/3",
                }}
                //   onClick={handleBlog}
              >
                Submit
              </Button>
            </fieldset>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddNew;
