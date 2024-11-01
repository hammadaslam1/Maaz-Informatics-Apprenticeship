import { Box, Card } from "@mui/material";
import StudentTable from "../components/tables/StudentTable";

const AddStudent = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Card
        sx={{
          mx: 14,
          borderRadius: 4,
        }}
        elevation={10}
      >
        <StudentTable />
      </Card>
    </Box>
  );
};

export default AddStudent;
