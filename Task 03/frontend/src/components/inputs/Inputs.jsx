import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { Input } from "@mui/joy";

const Inputs = ({ ...props }) => {
  return (
    <FormControl sx={{ marginY: "4px", width: "100%" }}>
      <FormLabel
        sx={{ fontSize: "14px", marginBottom: "2px", ml: 1, color: "#112d4e" }}
      >
        {props.label}
      </FormLabel>
      <Input sx={{ padding: "8px 12px" }} {...props} required />
      <FormHelperText sx={{ color: "#112d4e" }}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default Inputs;
