import { Box, Button, Card, Typography } from "@mui/material";
import Inputs from "../components/inputs/Inputs";
import StudentTable from "../components/tables/StudentTable";
import { useState } from "react";

const AddStudent = () => {
  const [students, setStudents] = useState(null);
  const fetchStudents = async () => {
    await fetch('http://localhost:3001/api/students/get')
  }
  return (
    <Box sx={{ p: 5 }}>
      <Card
        sx={{
          mx: 14,
          //   width: "clamp(600px, 40vw, 400px)",
          borderRadius: 4,
        }}
        elevation={10}
      >
        <StudentTable students={students} />
      </Card>
    </Box>
  );
};

export default AddStudent;
