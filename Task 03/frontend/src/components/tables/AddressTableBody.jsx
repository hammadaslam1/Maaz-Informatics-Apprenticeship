import { TableCell, TableRow } from "@mui/material";

const AddressTableBody = ({ address, student_id, key }) => {
  return (
    <TableRow key={key}>
      <TableCell>{address.student_id}</TableCell>
      <TableCell>{address.street}</TableCell>
      <TableCell>{address.hometown}</TableCell>
      <TableCell>
        {/* <IconButton onClick={() => deleteAddress(address._id)}> */}
        {/* <DeleteForeverIcon /> */}
        {/* </IconButton> */}
      </TableCell>
    </TableRow>
  );
};

export default AddressTableBody;
