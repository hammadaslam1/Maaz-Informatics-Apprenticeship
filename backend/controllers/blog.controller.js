import Blog from "../models/blog.model.js";

export const createBlog = async (req, res, next) => {
  const { title, image, email, author, tags, content } = req.body;

  if (
    !title ||
    !image ||
    !email ||
    !author ||
    !tags ||
    !content ||
    title === "" ||
    content === "" ||
    image === "" ||
    email === "" ||
    author === "" ||
    tags === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBlog = new Blog({
      title: title,
      author: author,
      tags: tags,
      content: content,
      image: image,
      email: email,
    });
    await newBlog.save();
    res.status(20).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
