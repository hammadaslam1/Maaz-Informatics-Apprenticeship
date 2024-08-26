/* eslint-disable eqeqeq */
import { Input } from "@mui/joy";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddressUpdateDialog = ({
  open,
  setOpen,
  getAddresses,
  setAddresses,
  addresses = [],
  index = 0,
}) => {
  const [street, setStreet] = useState(addresses[index].street);
  const [hometown, setHometown] = useState(addresses[index].hometown);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddressUpdate = async (_id) => {
    setIsLoading(true);
    if (street == "" || hometown == "" || !street || !hometown) {
      setIsLoading(false);
      alert("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("street", street);
    formData.append("hometown", hometown);

    try {
      const obj = {
        street,
        hometown,
      };
      await fetch(`http://localhost:3001/api/addresses/update-address/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then(async (response) => {
          if (response.status == 200) {
            setIsLoading(false);
            getAddresses();
            setHometown("");
            setStreet("");
            const data = await response.json();
            setAddresses((prevUsers) =>
              prevUsers.map((user) => (user._id == data._id ? data : user))
            );
            getAddresses();
          } else {
            setIsLoading(() => false);
            alert(response.status);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setOpen(false);
          alert(error.message);
        })
        .finally(() => {
          getAddresses();
          setOpen(false);
        });
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      scroll="body"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        borderRadius: 4,
      }}
      fullWidth={true}
    >
      <Backdrop open={isLoading} sx={{ zIndex: 999 }}>
        <CircularProgress />
      </Backdrop>
      {open ? (
        <>
          <DialogTitle>
            <Typography
              variant="h4"
              textAlign={"center"}
              fontWeight={600}
              color={"#333"}
            >
              {addresses[index]?.student_name}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{}}>
            <Box sx={{ m: 5 }}>
              <FormControl sx={{ m: 1, mb: 0 }} fullWidth>
                <FormLabel sx={{ textAlign: "left", mx: 1 }}>Street:</FormLabel>
                <Input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <FormHelperText>
                  Please ensure to enter correct street address
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, mb: 0 }} fullWidth>
                <FormLabel sx={{ textAlign: "left", mx: 1 }}>
                  Home Town:
                </FormLabel>
                <Input
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                />
                <FormHelperText>
                  Please write the correct home town
                </FormHelperText>
              </FormControl>
            </Box>
          </DialogContent>
        </>
      ) : (
        <Typography variant="h4" color="#888">
          No Record Found
        </Typography>
      )}
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CancelIcon />}
          sx={{ textTransform: "capitalize" }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<UpdateIcon />}
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleAddressUpdate(addresses[index]._id)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressUpdateDialog;
