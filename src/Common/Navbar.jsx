import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  const handleSignOut = () => {
    logout().then(() => {
      console.log("successfully sign ot");
    });
  };
  useEffect(() => {
    if (user) {
      console.log(`Welcome back, ${user.email}`);
    }
  }, [user]);

  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-btn1 text-white font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-blog"
          className={({ isActive }) =>
            isActive ? "bg-btn1 text-white font-semibold" : ""
          }
        >
          Add Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-blogs"
          className={({ isActive }) =>
            isActive ? "bg-btn1 text-white font-semibold" : ""
          }
        >
          All blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/featured-blogs"
          className={({ isActive }) =>
            isActive ? "bg-btn1 text-white font-semibold" : ""
          }
        >
          Featured Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "bg-btn1 text-white font-semibold" : ""
          }
        >
          Wishlist
        </NavLink>
      </li>
    </>
  );
  return (
    <div className=" bg-bg font-poppins">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <Link to="/" className=" text-xl md:text-2xl font-bold text-black">
            Blog Website
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{Links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <button
                className="bg-primary text-white px-4 rounded-lg py-2"
                onClick={handleSignOut}
              >
                SignOut
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-primary text-white px-4 rounded-lg py-2 mr-3"
              >
                Register
              </Link>
              <Link
                to="/sign-in"
                className="bg-primary text-white px-4 rounded-lg py-2"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
