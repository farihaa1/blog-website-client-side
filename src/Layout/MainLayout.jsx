import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar";


const MainLayout = () => {
    return (
        <div className="font-poppins bg-bg">
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