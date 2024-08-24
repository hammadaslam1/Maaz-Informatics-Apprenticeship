import { Box, Button, Card, Typography } from "@mui/material";
import Inputs from "../components/inputs/Inputs";
import StudentTable from "../components/tables/StudentTable";
import { useEffect, useState } from "react";

const AddStudent = () => {
  const [students, setStudents] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState("");
  const handleImage = (e) => {
    setImageFile((prev) => e.target.files[0]);
    setImageName((prev) => e.target.files[0]?.name);
    // handleImageUpload();
  };
  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", imageFile);
    fetch(`http://localhost:3001/api/students/create-student/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        alert(`Image uploaded successfully with id: ${data.id}`);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleStudentUpload = () => {};

  const handleStudentDelete = (id) => {};

  const handleStudentUpdate = (id) => {};
  const getStudents = async () => {
    try {
      await fetch("http://localhost:3001/api/students/get-students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
        })
        .then((data) => {
          setStudents(data);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Card
        sx={{
          mx: 14,
          //   width: "clamp(600px, 40vw, 400px)",
          borderRadius: 4,
        }}
        elevation={10}
      >
        <StudentTable
          students={students}
          handleImage={handleImage}
          handleImageUpload={handleImageUpload}
          handleStudentDelete={handleStudentDelete}
          handleStudentUpdate={handleStudentUpdate}
          handleStudentUpload={handleStudentUpload}
          imageName={imageName}
          getStudents={getStudents}
          setID={setID}
          setName={setName}
          setEmail={setEmail}
        />
      </Card>
    </Box>
  );
};

export default AddStudent;
