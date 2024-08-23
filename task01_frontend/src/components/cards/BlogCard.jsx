import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BLOG } from "../../router/Routes";

const BlogCard = ({ data, key }) => {
  const navigate = useNavigate();
  return (
    <Card key={key} sx={{ width: 345 }} elevation={10}>
      <CardActionArea onClick={() => navigate(BLOG, { state: data })}>
        <CardMedia component="img" height="240" image={data.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "200px", overflow: "hidden", textAlign: "justify" }}
          >
            {data.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
