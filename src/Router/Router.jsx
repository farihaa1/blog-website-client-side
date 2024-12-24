import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path:'/',
            element: <HomePage></HomePage>,
        },
        {
            path:'/register',
            element: <RegisterPage></RegisterPage>,
        },
        {
            path:'/sign-in',
            element: <LoginPage></LoginPage>,
        },
       
    ]
  },
]);

export default Router;
