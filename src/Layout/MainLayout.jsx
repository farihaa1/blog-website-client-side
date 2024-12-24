import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar";


const MainLayout = () => {
    return (
        <div>
          <nav>
            <Navbar></Navbar>
          </nav>
          <main>
            <Outlet></Outlet>
          </main>
        </div>
    );
};

export default MainLayout;