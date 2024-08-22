/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebase";
import { Input } from "@mui/joy";
import { MAINPAGE } from "../router/Routes";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [downloadedURL, setDownloadedURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);

  const inputRef = useRef(null);
  const handleImageChange = (e) => {
    setImageFile((prev) => e.target.files[0].name);
    handleImage(e.target.files[0]);
  };
  const handleImage = async (file) => {
    setLoading(true);
    const storage = getStorage(app);
    try {
      const imageRef = ref(storage, `images/${file.name}`);
      const uploadImage = uploadBytesResumable(imageRef, file);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageProgress(progress.toFixed(0));
          console.log(`Upload is ${progress}% done`);
          if (progress.toFixed(0) == 100) {
            getDownloadURL(imageRef).then((url) => {
              setDownloadedURL((prev) => url);
              alert(url);
              setLoading(false);
            });
            setLoading(false);
          }
        },
        () => {
          getDownloadURL(imageRef).then((url) => {
            setDownloadedURL((prev) => url);
            alert(url);
            setLoading(false);
          });
        }
      );
    } catch {
      setLoading(false);
      alert("Error uploading image");
    }
  };

  const handleSubmit = async () => {
    const newPost = {
      title,
      content,
      author,
      email,
      tags,
      image: downloadedURL,
    };
    await fetch("http://localhost:3002/api/blogs/create-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((response) => {
      if (response.status == 200) {
        navigate(MAINPAGE);
      } else {
        alert(JSON.stringify(response));
      }
    });
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
      <Backdrop
        sx={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <Typography variant="h6" color="#fff">
          {`${imageProgress}%`}
        </Typography>
        <div
          style={{
            border: "2px solid #fff",
            height: "14px",
            width: "70%",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: "#fff",
              width: `${imageProgress}%`,
            }}
          ></div>
        </div>
        {/* <CircularProgress color="inherit" /> */}
      </Backdrop>
      <Card sx={{ width: "clamp(1000px, 70vw, 500px)", m: 3 }} elevation={10}>
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
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <TextField
                id="outlined-textarea"
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                id="outlined-textarea"
                label="Tags"
                placeholder="Enter tags here"
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
              />
              <TextField
                id="outlined-textarea"
                label="Blog"
                placeholder="Enter your blog"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                minRows={5}
                maxRows={15}
                sx={{ gridColumn: "1/3" }}
                required
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
              />
              <Input
                placeholder="Image Path"
                value={imageFile}
                startDecorator={
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      p: 1.5,
                      px: 4,
                      textTransform: "capitalize",
                      fontSize: 16,
                    }}
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
                  p: 1,
                  fontSize: 24,
                  textTransform: "capitalize",
                }}
                onClick={handleSubmit}
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
