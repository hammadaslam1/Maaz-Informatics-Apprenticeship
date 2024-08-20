import logo from "./logo.svg";
import "./App.css";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import Navigations from "./router/Navigations";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  if (currentUser) {
    alert(JSON.stringify(currentUser));
  }
  return (
    <div className="App">
      <Navigations />
    </div>
  );
}

export default App;
