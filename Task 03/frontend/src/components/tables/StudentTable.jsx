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
import { useRef } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UpdateIcon from "@mui/icons-material/Update";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const StudentTable = ({ students }) => {
  const imageRef = useRef();
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <input type="file" ref={imageRef} hidden />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#444", p: 3 }}>
            <TableCell colSpan={4} sx={{ p: 3, px: 8 }}>
              <Typography variant="h4" fontWeight={600} color={"#fff"}>
                Students
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ p: 3 }} colSpan={4}>
            <TableCell sx={{}} colSpan={2}>
              <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                Student ID
              </Typography>
              <Input sx={{ flex: 3 }} />
            </TableCell>
            <TableCell sx={{}} colSpan={2}>
              <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                Student Name
              </Typography>
              <Input sx={{ flex: 3 }} />
            </TableCell>
          </TableRow>
          <TableRow sx={{ p: 3 }}>
            <TableCell sx={{}} colSpan={2}>
              <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                Student Email
              </Typography>
              <Input sx={{ flex: 3 }} />
            </TableCell>
            <TableCell sx={{}} colSpan={2}>
              <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                Student Image
              </Typography>
              <Input
                placeholder="Student Image"
                // value={imageFile}
                startDecorator={
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<UploadIcon />}
                    sx={{
                      textTransform: "capitalize",
                    }}
                    onClick={() => imageRef.current.click()}
                  >
                    Upload
                  </Button>
                }
                // onClick={() => inputRef.current.click()}
                sx={{ gridColumn: "1/3", px: 0 }}
                label="Image"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{}} colSpan={4}>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PersonAddIcon />}
                  sx={{ textTransform: "capitalize" }}
                >
                  Add Student
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<UpdateIcon />}
                  sx={{ textTransform: "capitalize" }}
                >
                  Update Student
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  sx={{ textTransform: "capitalize" }}
                >
                  Delete Student
                </Button>
              </Box>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {students &&
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
                <TableCell>{row.id}</TableCell>
                {/* <TableCell>{row.id}</TableCell> */}
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
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
