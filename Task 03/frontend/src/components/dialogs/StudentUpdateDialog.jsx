/* eslint-disable eqeqeq */
import { Input } from "@mui/joy";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styles } from "./DialogsStyles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const StudentUpdateDialog = ({
  open,
  setOpen,
  getStudents,
  setStudents,
  students = [],
  index = 0,
  setFlag,
}) => {
  const imageRef = useRef();
  const [id, setID] = useState(students[index].student_id);
  const [name, setName] = useState(students[index].name);
  const [email, setEmail] = useState(students[index].email);
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(
    `http://localhost:3001/${students[index].image}`
  );
  const handleImage = (e) => {
    setImageFile((prev) => e.target.files[0]);
    setImageName((prev) => e.target.files[0]?.name);
    const newImage = URL.createObjectURL(e.target.files[0]);
    setDefaultImage(newImage);
  };
  const handleClose = () => {
    setOpen(false);
    setDefaultImage(`http://localhost:3001/${students[index].image}`);
    setFlag((prev) => prev + 1);
  };

  const handleStudentUpdate = async (_id) => {
    setIsLoading(true);
    if (id == "" || name == "" || email == "" || !id || !name || !email) {
      setIsLoading(false);
      alert("Please fill all required fields");
      return;
    }
    const formData = new FormData();

    // // formDataWithoutImage.append("id", id);
    // // formDataWithoutImage.append("name", name);
    // // formDataWithoutImage.append("email", email);
    formData.append("id", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", imageFile);
    const routeWithImage = "update-student";
    const routeWithoutImage = "update-student-no-image";
    // console.log(formDataWithoutImage);
    try {
      const formDataWithoutImage = {
        id: id,
        name: name,
        email: email,
      };
      // const formData = {
      //   id: id,
      //   name: name,
      //   email: email,
      //   image: imageFile,
      // };
      console.log(formData);
      await fetch(
        `http://localhost:3001/api/students/${
          imageFile ? routeWithImage : routeWithoutImage
        }/${_id}`,
        {
          method: "PUT",
          headers: imageFile
            ? undefined
            : {
                "Content-Type": "application/json",
              },
          body: !imageFile ? JSON.stringify(formDataWithoutImage) : formData,
        }
      )
        .then(async (response) => {
          console.log(response.data);
          if (response.status == 200) {
            setIsLoading(false);
            getStudents();
            setID("");
            setName("");
            setEmail("");
            setImageFile(null);
            setImageName("");
            setFlag((prev) => prev + 1);
            const data = await response.json();
            setStudents((prevUsers) =>
              prevUsers.map((user) => (user._id == data._id ? data : user))
            );
            getStudents();
          } else {
            setIsLoading((prev) => false);
            alert(response.status);
          }
        })
        .then((data) => {
          // alert(JSON.stringify(data));
        })
        .catch((error) => {
          setIsLoading(false);
          setOpen(false);
          setFlag((prev) => prev + 1);
          alert(error.message);
        })
        .finally(() => {
          getStudents();
          setOpen(false);
        });
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      scroll="body"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        borderRadius: 4,
      }}
      fullWidth={true}
    >
      <Backdrop open={isLoading} sx={{ zIndex: 999 }}>
        <CircularProgress />
      </Backdrop>
      <input
        type="file"
        ref={imageRef}
        onChange={handleImage}
        accept="image/*"
        hidden
      />
      {open ? (
        <>
          <DialogTitle>
            <Typography
              variant="h4"
              textAlign={"center"}
              fontWeight={600}
              color={"#333"}
            >
              {students[index]?.name}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{}}>
            <Box
              src={defaultImage}
              alt={students[index].name}
              sx={{
                p: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              disableTouchRipple
              disableFocusRipple
              disableRipple
            >
              <Avatar
                // src={defaultImage}
                sx={[
                  { backgroundImage: `url('${defaultImage}')` },
                  styles.avatar,
                ]}
              >
                <IconButton
                  onClick={() => imageRef.current.click()}
                  className="icon-button"
                  sx={styles.iconButton}
                >
                  <AddPhotoAlternateIcon
                    className="edit-icon"
                    sx={{
                      transform: "translateY(-200%)",
                      transition: "all 0.5s ease-in-out",
                    }}
                  />
                </IconButton>
              </Avatar>
            </Box>
            <Box sx={{ m: 5 }}>
              <FormControl sx={{ m: 1, mb: 0 }} fullWidth>
                <FormLabel sx={{ textAlign: "left", mx: 1 }}>
                  Student ID:
                </FormLabel>
                <Input
                  value={id}
                  //   defaultValue={students[index].student_id}
                  onChange={(e) => setID(e.target.value)}
                />
                <FormHelperText>
                  Please ensure to enter correct student id
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, mb: 0 }} fullWidth>
                <FormLabel sx={{ textAlign: "left", mx: 1 }}>
                  Full Name:
                </FormLabel>
                <Input
                  value={name}
                  //   defaultValue={students[index].name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormHelperText>
                  Please write name as per cnic or form-b
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, mb: 0 }} fullWidth>
                <FormLabel sx={{ textAlign: "left", mx: 1 }}>
                  Email Address:
                </FormLabel>
                <Input
                  value={email}
                  //   defaultValue={students[index].email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormHelperText>
                  Email will be used to contact you so, please write it
                  correctly
                </FormHelperText>
              </FormControl>
            </Box>
          </DialogContent>
        </>
      ) : (
        <Typography variant="h4" color="#888">
          No Record Found
        </Typography>
      )}
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CancelIcon />}
          sx={{ textTransform: "capitalize" }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<UpdateIcon />}
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleStudentUpdate(students[index]._id)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentUpdateDialog;
