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

const AddressTable = () => {
  const [addresses, setAddresses] = useState(null);
  const [open, setOpen] = useState(false);
  const [allStudents, setAllStudents] = useState(null);
  const [student, setStudent] = useState("");
  //   const

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
            <TableCell sx={{ flex: 1 }} colSpan={2}>
              <Typography variant="h6" fontWeight={600}>
                Student ID
              </Typography>
              <Select
                onChange={(e) => {
                  setStudent(e.target.value);
                }}
                sx={{ width: "100%", height: 35 }}
              >
                {allStudents &&
                  allStudents.map((data, i) => (
                    <MenuItem value={`${data.student_id} | ${data.name}`}>
                      {data.name}
                    </MenuItem>
                  ))}
              </Select>
            </TableCell>
            <TableCell sx={{ flex: 1 }} colSpan={2}>
              <Typography variant="h6" fontWeight={600}>
                Student Name
              </Typography>
              {/* <Input
                sx={{ flex: 3 }}
                value={name}
                // onChange={(e) => setName(e.target.value)}
              /> */}
              <Typography
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1.5,
                  height: 35,
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                }}
              >
                {student?.split(" | ")[1]}
              </Typography>
            </TableCell>
            <TableCell sx={{ flex: 1 }} colSpan={2}>
              <Typography variant="h6" fontWeight={600}>
                Street
              </Typography>
              <Input
                sx={{ flex: 3 }}
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow sx={{ p: 3 }}>
            <TableCell sx={{ flex: 1 }} colSpan={3}>
              <Typography variant="h6" fontWeight={600}>
                Home Town
              </Typography>
              <Input
                sx={{ flex: 3 }}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </TableCell>
            <TableCell sx={{ alignContent: "center" }} colSpan={2}>
              <Button
                variant="contained"
                color="success"
                // startIcon={<PersonAddIcon />}
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  alignSelf: "flex-end",
                }}
                // onClick={handleStudentUpload}
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
              Student ID
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Image
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Street
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
                <TableCell>{row.student_id}</TableCell>
                {/* <TableCell>{row.id}</TableCell> */}
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3001/${row.image}`}
                    height={"70px"}
                    alt={row.name}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button
                      variant="contained"
                      color="warning"
                      //   startIcon={<UpdateIcon />}
                      sx={{ textTransform: "capitalize" }}
                      //   onClick={() => handleOpen(i)}
                    >
                      Update Student
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      //   startIcon={<DeleteForeverIcon />}
                      sx={{ textTransform: "capitalize" }}
                      //   onClick={() => handleStudentDelete(row._id)}
                    >
                      Delete Student
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
