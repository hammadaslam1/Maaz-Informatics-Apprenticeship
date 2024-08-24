import Address from '../models/address.model.js'

export const createAddress = async (req, res) => {
  const { studentID, street, hometown } = req.body;
  try {
    const address = new Address({ student_id: studentID, street, hometown });
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: "Error saving address" });
  }

  next();
};

export const getAddressesByID = async (req, res) => {
  const { id } = req.params;
  try {
    const addresses = await Address.find({ _id: id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
};

export const getAddressesByStudentID = async (req, res) => {
  const { studentID } = req.params;
  try {
    const addresses = await Address.find({ student_id: studentID });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
};

export const updateAddress = async (req, res) => {};
