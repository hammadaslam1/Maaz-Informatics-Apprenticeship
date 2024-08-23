import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { styles } from "./TableStyles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const UsersTable = () => {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const fetchUsers = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Box sx={styles.main}>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#444", p: 3 }}>
              <TableCell colSpan={9} sx={{ p: 3, px: 8 }}>
                <Typography variant="h4" fontWeight={600} color={"#fff"}>
                  User Details
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Username
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Zip Code
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Phone No.
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Website
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  ".MuiTableCell-root": {
                    width: "100px",
                  },
                }}
              >
                Company Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              (rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              ).map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.id}
                  </TableCell>
                  {/* <TableCell>{row.id}</TableCell> */}
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.username}
                  </TableCell>
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >{`${row.address.street}, ${row.address.suite}, ${row.address.city}`}</TableCell>
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.address.zipcode}
                  </TableCell>
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.phone.split(" ")[0]}
                  </TableCell>
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.website}
                  </TableCell>
                  <TableCell
                    sx={{
                      ".MuiTableCell-root, .MuiTableCell-body": {
                        width: "60px",
                      },
                    }}
                  >
                    {row.company.name}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
