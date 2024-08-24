/* eslint-disable eqeqeq */
import { Input } from "@mui/joy";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useRef, useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const StudentUpdateDialog = ({
  open,
  setOpen,
  getStudents,
  students = [],
  index = 0,
}) => {
  const imageRef = useRef();
  const [id, setID] = useState(students[index]?.id);
  const [name, setName] = useState(students[index]?.name);
  const [email, setEmail] = useState(students[index]?.email);
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(
    `http://localhost:3001/${students[index]?.image}`
  );
  const handleImage = (e) => {
    setImageFile((prev) => e.target.files[0]);
    setImageName((prev) => e.target.files[0]?.name);
    const newImage = URL.createObjectURL(e.target.files[0]);
    setDefaultImage(newImage);
  };
  const handleClose = () => {
    setOpen(false);
    setDefaultImage(`http://localhost:3001/${students[index]?.image}`);
  };

  const handleStudentUpdate = async (_id) => {
    setIsLoading(true);
    if (id == "" || name == "" || email == "") {
      setIsLoading(false);
      alert("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", imageFile);
    try {
      await fetch(`http://localhost:3001/api/students/update-student/${_id}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          alert(response.status);
          if (response.status == 200) {
            const data = response.json();
            setIsLoading(false);
            setID("");
            setName("");
            setEmail("");
            setImageFile(null);
            setImageName("");
            //   setOpen(false);
            getStudents();
            alert("response 200", JSON.stringify(data));
          } else {
            setIsLoading(false);
            alert(JSON.stringify(response));
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    } catch (error) {
      setIsLoading(false);
      alert(error);
      alert(JSON.stringify(error));
    }
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
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
            <Typography variant="h4">{students[index]?.name}</Typography>
          </DialogTitle>
          <DialogContent>
            <img
              src={defaultImage}
              height={"200px"}
              alt={students[index].name}
              onClick={() => imageRef.current.click()}
              style={{ cursor: "pointer" }}
            />
            <Input
              defaultValue={students[index].student_id}
              onChange={(e) => setID(e.target.value)}
            />
            <Input
              defaultValue={students[index].name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              defaultValue={students[index].email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<UpdateIcon />}
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleStudentUpdate()}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentUpdateDialog;
