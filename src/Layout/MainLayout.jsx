import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Components/Footer";


const MainLayout = () => {
    return (
        <div className="font-poppins bg-bg">
          <nav>
            <Navbar></Navbar>
          </nav>
          <main>
            <Outlet></Outlet>
          </main>
          <footer>
            <Footer></Footer>
          </footer>
        </div>
    );
};


export default MainLayout;