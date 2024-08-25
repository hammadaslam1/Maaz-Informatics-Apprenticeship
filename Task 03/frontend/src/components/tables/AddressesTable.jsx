import {
  Alert,
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import AddressTableBody from "./AddressTableBody";
import { useEffect, useState } from "react";
import { Input } from "@mui/joy";
import AddHomeIcon from "@mui/icons-material/AddHome";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/Delete";

const AddressTable = () => {
  const [addresses, setAddresses] = useState(null);
  const [open, setOpen] = useState(false);
  const [allStudents, setAllStudents] = useState(null);
  const [student, setStudent] = useState("");
  const [street, setStreet] = useState("");
  const [hometown, setHometown] = useState("");
  //   const

  const handleAddressUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("student_id", student.split(" | ")[0]);
      formData.append("student_name", student.split(" | ")[1]);
      formData.append("street", street);
      formData.append("hometown", hometown);
      console.log(`${student}\n${street}\n${hometown}`);
      await fetch("http://localhost:3001/api/addresses/create-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: student.split(" | ")[0],
          student_name: student.split(" | ")[1],
          street,
          hometown,
        }),
      })
        .then((response) => {
          alert(response.status);
          if (response.status === 200) {
            // alert("Address uploaded successfully!");
            getAddresses();
            setStudent('');
            setStreet('');
            setHometown('');
          } else {
            alert("Failed to upload address!");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {}
  };
  const getAddresses = async () => {
    try {
      await fetch("http://localhost:3001/api/addresses/get-addresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          setAddresses(data);
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };
  const getStudents = async () => {
    try {
      await fetch("http://localhost:3001/api/students/get-students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
        })
        .then((data) => {
          setAllStudents(data);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  useEffect(() => {
    getAddresses();
    getStudents();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      {/* {open && (
        <StudentUpdateDialog
          open={open}
          setOpen={setOpen}
          getStudents={getStudents}
          index={index}
          students={students}
        />
      )} */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#444", p: 3 }}>
            <TableCell colSpan={6} sx={{ p: 3, px: 8 }}>
              <Typography variant="h4" fontWeight={600} color={"#fff"}>
                Student Addresses
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ p: 3 }}>
            <TableCell sx={{ flex: 1 }} colSpan={3}>
              <Typography variant="h6" fontWeight={600}>
                Student Name
              </Typography>
              <Select
              value={student}
                onChange={(e) => {
                  setStudent(e.target.value);
                }}
                sx={{ width: "100%", height: 35 }}
              >
                {allStudents &&
                  allStudents.map((data, i) => (
                    <MenuItem
                      value={`${data.student_id} | ${data.name}`}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{data.name}</Typography>
                    </MenuItem>
                  ))}
              </Select>
            </TableCell>
            <TableCell sx={{ flex: 1 }} colSpan={3}>
              <Typography variant="h6" fontWeight={600}>
                Street Address
              </Typography>
              <Input
                sx={{ flex: 3 }}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow sx={{ p: 3 }}>
            <TableCell sx={{ flex: 1 }} colSpan={4}>
              <Typography variant="h6" fontWeight={600}>
                Home Town
              </Typography>
              <Input
                sx={{ flex: 3 }}
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
              />
            </TableCell>
            <TableCell sx={{ alignContent: "center" }} colSpan={2}>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddHomeIcon />}
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  alignSelf: "flex-end",
                }}
                onClick={handleAddressUpload}
              >
                Add Address
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Student Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
              }}
              colSpan={2}
            >
              Street Address
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Home Town
            </TableCell>
            <TableCell colSpan={2} sx={{ fontWeight: 700 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses && addresses.length > 0 ? (
            // (rowsPerPage > 0
            //   ? users.slice(
            //       page * rowsPerPage,
            //       page * rowsPerPage + rowsPerPage
            //     )
            //   : users
            // ).map((row, i) => (
            addresses.map((row, i) => (
              <TableRow
                key={i}
                // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
              >
                <TableCell>{row.student_name}</TableCell>
                <TableCell colSpan={2}>{row.street}</TableCell>
                <TableCell>{row.hometown}</TableCell>
                <TableCell colSpan={2}>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<UpdateIcon />}
                      sx={{ textTransform: "capitalize" }}
                      //   onClick={() => handleOpen(i)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteForeverIcon />}
                      sx={{ textTransform: "capitalize" }}
                      //   onClick={() => handleStudentDelete(row._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ p: 3, px: 8 }}>
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  fontWeight={700}
                  color={"#888"}
                >
                  No Result found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddressTable;
