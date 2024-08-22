/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Card, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase/firebase";
import { Input } from "@mui/joy";

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
  const [imageFile, setImageFile] = useState("");
  const [downloadedURL, setDownloadedURL] = useState(null);

  const inputRef = useRef(null);
  const handleImageChange = (e) => {
    alert(e.target.files[0].name);
    setImageFile((prev) => e.target.files[0].name);
    handleImage(e.target.files[0]);
  };
  const handleImage = async (file) => {
    const storage = getStorage(app);
    try {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(imageRef).then((url) => {
          setDownloadedURL((prev) => url);
          alert("image uploaded successfully");
        });
      });
    } catch {
      alert("Failed to upload image");
    }
  };
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
      <Card sx={{ maxWidth: "800px", minWidth: "700px", m: 3 }} elevation={10}>
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
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
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
              <Input
                placeholder="Upload Image"
                value={imageFile}
                startDecorator={
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ p: 2, px: 4 }}
                    onClick={() => inputRef.current.click()}
                    // startDecorator={<LocationOn />}
                  >
                    Upload
                  </Button>
                }
                // onClick={() => inputRef.current.click()}
                sx={{ gridColumn: "1/3", px: 0 }}
                label="Image"
              />
              {downloadedURL && (
                <img
                  src={downloadedURL}
                  // loading="lazy"
                  style={{ height: "100px" }}
                />
              )}
              <Button
                variant="contained"
                sx={{
                  gridColumn: "1/3",
                }}
                onClick={handleImage}
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
