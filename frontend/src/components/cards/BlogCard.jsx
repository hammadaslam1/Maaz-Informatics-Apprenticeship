import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const BlogCard = ({ data }) => {
  return (
    <Card sx={{ width: 345 }} elevation={10}>
      <CardActionArea onClick={()=>alert('clicked')}>
        <CardMedia component="img" height="240" image={data.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "200px", overflow: "hidden", textAlign: 'justify' }}
          >
            {data.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
