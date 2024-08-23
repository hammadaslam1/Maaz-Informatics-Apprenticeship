import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { styles } from "./TableStyles";
import { useEffect, useState } from "react";

const MovieTable = () => {
  const [movies, setMovies] = useState(null);
  const fetchMovies = async () => {
    try {
      await fetch("https://imdb-top-100-movies.p.rapidapi.com/", {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "4c6708871amsh258f72a57ac8269p1b85e1jsnca2c26839ae4",
          "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
        },
        accept: "application/json",
        "content-type": "application/json",
      })
        .then((response) => {
          //   console.log(response.json());
          if (response.ok) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((data) => {
          if (data) {
            console.log(data);
            setMovies(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  const rows = [
    { name: "Frozen yogurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    {
      name: "Gingerbread man",
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
    },
  ];
  return (
    <Box sx={styles.main}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>IMDB ID</TableCell>
              <TableCell>Link to IMDB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies &&
              movies.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.rank}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.image}</TableCell>
                  <TableCell>{row.genre.join(", ")}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.imdbid}</TableCell>
                  <TableCell>{row.imdb_link}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={rows.length}
                // rowsPerPage={rowsPerPage}
                // page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MovieTable;
