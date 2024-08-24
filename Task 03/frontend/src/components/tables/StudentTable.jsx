import { Input } from "@mui/joy";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UpdateIcon from "@mui/icons-material/Update";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StudentUpdateDialog from "../dialogs/StudentUpdateDialog";

const StudentTable = () => {
  const imageRef = useRef();
  const [students, setStudents] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const handleImage = (e) => {
    setImageFile((prev) => e.target.files[0]);
    setImageName((prev) => e.target.files[0]?.name);
  };
  const handleStudentUpload = async () => {
    if (id == "" || name == "" || email == "") {
      alert("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", imageFile);
    try {
      await fetch(`http://localhost:3001/api/students/create-student/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
        })
        .then((data) => {
          getStudents();
          setID("");
          setName("");
          setEmail("");
          setImageFile(null);
          setImageName("");
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const handleStudentDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/students/delete-student/${id}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
        })
        .then((data) => {
          getStudents();
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(JSON.stringify(error));
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
          setStudents(data);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const handleOpen = (i) => {
    setIndex((prev) => i);
    setOpen((prev) => true);
  };

  useEffect(() => {
    getStudents();
  }, [open]);
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <input
        type="file"
        ref={imageRef}
        onChange={handleImage}
        accept="image/*"
        hidden
      />
      {open && (
        <StudentUpdateDialog
          open={open}
          setOpen={setOpen}
          getStudents={getStudents}
          index={index}
          students={students}
        />
      )}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#444", p: 3 }}>
            <TableCell colSpan={6} sx={{ p: 3, px: 8 }}>
              <Typography variant="h4" fontWeight={600} color={"#fff"}>
                Students
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ p: 3 }}>
            <TableCell sx={{ flex: 1 }} colSpan={2}>
              <Typography variant="h6" fontWeight={600}>
                Student ID
              </Typography>
              <Input
                sx={{ flex: 3 }}
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </TableCell>
            <TableCell sx={{ flex: 1 }} colSpan={2}>
              <Typography variant="h6" fontWeight={600}>
                Student Name
              </Typography>
              <Input
                sx={{ flex: 3 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </TableCell>
            <TableCell sx={{ flex: 1 }} colSpan={2}>
              <Typography variant="h6" fontWeight={600}>
                Student Email
              </Typography>
              <Input
                sx={{ flex: 3 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow sx={{ p: 3 }}>
            <TableCell sx={{}} colSpan={4}>
              <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                Student Image
              </Typography>

              <Input
                placeholder="Student Image"
                value={imageName || ""}
                onClick={() => imageRef.current.click()}
                startDecorator={
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<UploadIcon />}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Upload
                  </Button>
                }
                sx={{ gridColumn: "1/3", px: 0 }}
                label="Image"
              />
            </TableCell>
            <TableCell sx={{ alignContent: "center" }} colSpan={2}>
              <Button
                variant="contained"
                color="success"
                startIcon={<PersonAddIcon />}
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  alignSelf: "flex-end",
                }}
                onClick={handleStudentUpload}
              >
                Add Student
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
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Image
            </TableCell>
            <TableCell colSpan={2} sx={{ fontWeight: 700 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students && students.length > 0 ? (
            // (rowsPerPage > 0
            //   ? users.slice(
            //       page * rowsPerPage,
            //       page * rowsPerPage + rowsPerPage
            //     )
            //   : users
            // ).map((row, i) => (
            students.map((row, i) => (
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
                      startIcon={<UpdateIcon />}
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => handleOpen(i)}
                    >
                      Update Student
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteForeverIcon />}
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => handleStudentDelete(row._id)}
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
        {/* <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={users?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={(e, n) => setPage(n)}
              onRowsPerPageChange={(e, n) => setRowsPerPage(n)}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
