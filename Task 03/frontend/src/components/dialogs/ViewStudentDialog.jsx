import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { forwardRef, useEffect, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ViewStudentDialog = ({ view, setView, studentData }) => {
  const [studentAddresses, setStudentAddresses] = useState(null);
  const handleClose = () => {
    setView(false);
  };
  const getAddresses = async () => {
    try {
      await fetch(
        `http://localhost:3001/api/addresses/get-address-by-student-id/${studentData._id}`
      )
        .then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            setStudentAddresses(data);
          } else {
            alert("Error: " + response.status);
            return;
          }
        })
        .catch(() => {
          alert("Failed to fetch addresses.");
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAddresses();
  });
  return (
    <Dialog
      open={view}
      TransitionComponent={Transition}
      scroll="body"
      keepMounted
      onClose={handleClose}
      sx={{
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
          <Typography variant="h6" fontWeight={600}>
            Student ID: {studentData.student_id}
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Email: {studentData.email}
          </Typography>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Accordion sx={{ overflow: "hidden", mt: 2 }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
              sx={{ backgroundColor: "#444" }}
            >
              <Typography variant="h6" color={"#fff"}>
                Student's All Addresses
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography fontWeight={600}>Street Address</Typography>
                    </TableCell>
                    <TableCell colSpan={1}>
                      <Typography fontWeight={600}>Home Town</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentAddresses && studentAddresses.length > 0 ? (
                    studentAddresses.map((address, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={2}>
                          <Typography>{address.street}</Typography>
                        </TableCell>
                        <TableCell colSpan={1}>
                          <Typography>{address.hometown}</Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography textAlign={'center'}>No addresses found.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStudentDialog;
