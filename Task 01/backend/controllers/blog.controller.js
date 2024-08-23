import Blog from "../models/blog.model.js";

export const createBlog = async (req, res, next) => {
  console.log(req.body);
  const { title, image, email, author, tags, content } = req.body;

  if (
    !title ||
    !image ||
    !email ||
    !author ||
    !content ||
    title === "" ||
    content === "" ||
    image === "" ||
    email === "" ||
    author === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBlog = new Blog({
      title: title,
      author: author,
      tags: tags.length > 0 && tags.split(","),
      content: content,
      image: image,
      email: email,
    });
    await newBlog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json("Nothing to Show");
  }
};
