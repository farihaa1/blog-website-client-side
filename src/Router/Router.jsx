import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import AddBlog from "../Pages/AddBlog";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import WishList from "../Pages/WishList/WishList";
import FeaturedBlogs from "../Pages/FeaturedBlogs/FeaturedBlogs";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist/:id",
        element: (
          <PrivateRoute>
            <WishList></WishList>
          </PrivateRoute>
        ),
        
      },
      {
        path: "/all-blogs",
        element: <AllBlogs></AllBlogs>
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
        loader: ()=> fetch("http://localhost:5000/featured-blogs"),
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/sign-in",
        element: <LoginPage></LoginPage>,
      },
    ],
  },
]);

export default Router;
