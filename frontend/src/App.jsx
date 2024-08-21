import logo from "./logo.svg";
import "./App.css";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import Navigations from "./router/Navigations";

function App() {
  
  return (
    <div className="App">
      <Navigations />
    </div>
  );
}

export default App;
