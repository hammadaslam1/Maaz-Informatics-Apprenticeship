/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import Navigations from "./router/Navigations";

function App() {
  const [image, setImage] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/api/student/getFiles/OOP/bsit", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data[0]);
        console.log(data);
      });
  }, []);
  return (
    <div className="">
      {/* <Login /> */}
      {/* <Navigations /> */}

      {image && <img src={`http://localhost:3001/${image.file}`} alt="image not found" />}
    </div>
  );
}

export default App;
