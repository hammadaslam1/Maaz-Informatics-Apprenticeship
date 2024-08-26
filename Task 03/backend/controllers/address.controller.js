import Address from "../models/address.model.js";

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({});
    if (!addresses) {
      return res.status(404).json({ message: "No addresses found" });
    }
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
  next();
};
export const createAddress = async (req, res) => {
  const { student_id, student_name, street, hometown } = req.body;
  console.log(req.body);
  try {
    const address = new Address({ student_id, student_name, street, hometown });
    await address.save();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Error saving address" });
  }
};

export const getAddressesByID = async (req, res) => {
  const { id } = req.params;
  try {
    const addresses = await Address.findOne({ _id: id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
  next();
};

export const getAddressesByStudentID = async (req, res) => {
  const { id } = req.params;
  try {
    const addresses = await Address.find({ student_id: id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { street, hometown } = req.body;
  console.log(req.params, req.body);

  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id },
      { street: street, hometown: hometown }
    );
    if (!updatedAddress)
      return res.status(404).json({ message: "Address not found" });
    // await updatedAddress.save();
    const allAddresses = await Address.find({});
    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(500).json({ message: "Error updating address" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    const allAddresses = await Address.find({});
    res.status(200).json(allAddresses);
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
};
