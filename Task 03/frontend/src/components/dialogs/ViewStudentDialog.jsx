import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ViewStudentDialog = ({ view, setView, studentData }) => {
  const handleClose = () => {
    setView(false);
  };
  return (
    <Dialog
      open={view}
      TransitionComponent={Transition}
      keepMounted
      scroll="body"
      onClose={handleClose}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 4,
      }}
    >
      <DialogTitle>
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight={600}
          color={"#333"}
        >
          {studentData.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={`http://localhost:3001/${studentData.image}`}
            sx={{
              borderRadius: 50,
              width: 130,
              height: 130,
              border: "1px solid #444",
              transition: "all 0.2s ease-in-out",
            }}
          ></Avatar>
        </Box>
        <Typography variant="h6" fontWeight={600}>
          Student ID: {studentData.studentId}
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          Email: {studentData.email}
        </Typography>

        {/* Add more fields as needed */}
      </DialogContent>
    </Dialog>
  );
};

export default ViewStudentDialog;
