import "./App.css";
import Navigations from "./router/Navigations";
const server_url = process.env.REACT_APP_SERVER_URL
function App() {
  console.log(server_url);

  return <Navigations />;
}

export default App;
