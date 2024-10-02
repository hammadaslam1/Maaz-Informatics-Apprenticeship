import { CardMedia } from "@mui/material";

const ImageDisplay = ({ source }) => {
  return (
    <CardMedia
      component="img"
      image={source}
      alt="media not supported"
      sx={{
        background: "linear-gradient(to top, #cccccc 0%, #ffffff 100%)",
        objectFit: "cover",
      }}
    />
  );
};

export default ImageDisplay;
