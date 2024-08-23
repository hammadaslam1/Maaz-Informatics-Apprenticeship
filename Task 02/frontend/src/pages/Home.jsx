import Appbar from "../components/bars/Appbar";
import Sidebar from "../components/bars/Sidebar";
import HomeTable from "../components/tables/HomeTable";
import { styles } from "../styles/PageStyles";

const Home = () => {
  return (
    <>
      <Appbar />
      <div style={styles.homeBody}>
        <div style={styles.sidebars}>
        <Sidebar />
        </div>
        <HomeTable />
      </div>
    </>
  );
};

export default Home;
