import { CardMedia } from "@mui/material";

const VideoDisplay = ({ source }) => {
  return (
    <video className="" controls>
      <source src={source}  type="video/mp4" />
    </video>
  );
};

export default VideoDisplay;
