import Student from "../models/student.model.js";
import Address from "../models/address.model.js";

export const createStudent = async (req, res) => {
  try {
    const { path, filename } = req.file;
    const { id, name, email } = req.body;
    const newPath = path.replace(/\\/g, "/");
    if (id == "" || name == "" || email == "" || !id || !name || !email) {
      return res
        .status(500)
        .json({ message: "Please fill all required fields." });
    }
    const newStudent = new Student({
      student_id: id,
      name,
      email,
      image: newPath,
    });

    await newStudent.save();
    res.status(200).json(newStudent);
  } catch {
    res.status(500).json({ message: "Error saving student" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error getting students" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    const address = await Address.deleteMany({ student_id: req.params.id });
    res
      .status(200)
      .json({ message: "Student and its addresses deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { path, filename } = req.file;
    const { id, name, email } = req.body;
    const newPath = path.replace(/\\/g, "/");
    if (id == "" || name == "" || email == "" || !id || !name || !email) {
      return res
        .status(500)
        .json({ message: "Please fill all required fields." });
    }
    const newObject = {
      student_id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      image: newPath,
    };
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      newObject
    );
    const address = await Address.findOneAndUpdate(
      { _id: student._id },
      { student_name: student.name }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(409).json({ message: "Error updating student" });
  }
};
export const updateStudentWithoutImage = async (req, res) => {
  try {
    const { id, name, email } = req.body;

    if (id === "" || name === "" || email === "" || !id || !name || !email) {
      console.log(`id: ${id}\nname: ${name}\nemail: ${email}`);
      // console.log(req);
      return res
        .status(404)
        .json({ message: "Please fill all required fields." });
    }
    const newObject = {
      student_id: req.body.id,
      name: req.body.name,
      email: req.body.email,
    };
    console.log(newObject);
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      { ...newObject }
    );
    const addresses = await Address.updateMany(
      { student_id: req.params.id },
      {
        student_name: req.body.name,
      }
    );
    console.log(addresses);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // await student.save();
    const allStudents = await Student.find({});
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
};
