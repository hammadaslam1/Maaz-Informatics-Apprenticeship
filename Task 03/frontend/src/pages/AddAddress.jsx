import { Box, Card } from "@mui/material";
import AddressTable from "../components/tables/AddressesTable";

const AddAddress = () => {
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
        <AddressTable />
      </Card>
    </Box>
  );
};

export default AddAddress;
