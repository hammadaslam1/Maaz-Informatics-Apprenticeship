import User from "../models/api.model.js";

export const postApi = async (req, res) => {
  const {
    name,
    fatherName,
    cnic,
    age,
    email,
    address,
    phone,
    dateOfBirth,
    gender,
    bloodGroup,
    occupation,
    nationality,
  } = req.body;
  try {
    const user = new User({
      name,
      fatherName,
      cnic,
      age,
      email,
      address,
      phone,
      dateOfBirth,
      gender,
      bloodGroup,
      occupation,
      nationality,
    });
    await user.save();
    const users = await User.find({});
    if (!users) {
      res.status(404).json({ message: "No users found" });
    }
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putApi = (req, res) => {
  res.status(201).json({ message: "API endpoint for retrieving data (PUT)" });
};

export const getApi = (req, res) => {
  res.status(200).json({ message: "API endpoint for retrieving data (GET)" });
};

export const deleteApi = (req, res) => {
  res
    .status(200)
    .json({ message: "API endpoint for retrieving data (DELETE)" });
};
