import Appbar from "../components/bars/Appbar";
import Sidebar from "../components/bars/Sidebar";
import MovieTable from "../components/tables/MovieTable";
import UsersTable from "../components/tables/UsersTable";
import { styles } from "../styles/PageStyles";

const Home = () => {
  return (
    <>
      <Appbar />
      <div style={styles.homeBody}>
        <div style={styles.sidebars}>
          <Sidebar />
        </div>
        {/* <MovieTable /> */}
        <UsersTable />
      </div>
    </>
  );
};

export default Home;
