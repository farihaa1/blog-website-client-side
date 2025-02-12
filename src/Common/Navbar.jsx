import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeProfile = () => setIsProfileOpen(false);

  const handleSignOut = () => {
    logout().then(() => {
      console.log("successfully sign ot");
    });
  };

  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : "text-gray-500 lg:text-gray-400 "
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-blog"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : "text-gray-500 lg:text-gray-400 "
            }`
          }
        >
          Add Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-blogs"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg  ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : "text-gray-500 lg:text-gray-400 "
            }`
          }
        >
          All blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/featured-blogs"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : "text-gray-500 lg:text-gray-400 "
            }`
          }
        >
          Featured Blogs
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to={`/wishlist/${user?.email}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-btn1 text-white font-semibold"
                  : "text-gray-500 lg:text-gray-400 "
              }`
            }
          >
            Wishlist
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <motion.div
      animate={{ y: [-100, 0] }}
      transition={{ duration: 2 }}
      className=" bg-base-content sticky top-0 z-10 text-base-300 font-poppins py-2 lg:px-10 "
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mr-1 px-2 lg:hidden">
              <FaBars className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <ul
              tabIndex={0}
              className=" dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow space-y-3 pl-4 py-6"
            >
              {Links}
            </ul>
          </div>
          <Link
            to="/"
            className=" text-2xl md:text-3xl font-bold text-white font-inter"
          >
            Blog Website
          </Link>
        </div>

        <div className="navbar-end">
          {user ? (
            <div>
              <div
                onClick={toggleProfile}
                className="rounded-full w-10 h-10 md:w-12 md:h-12 cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Profile"
                  title={user.displayName}
                />
              </div>
              {isProfileOpen && (
                <div
                  className={`absolute top-28 w-72 py-4 rounded-xl right-2 bg-white px-6  z-10 shadow-md  transform transition-transform duration-300 ease-in-out ${
                    isProfileOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }`}
                >
                  <ul className="menu-vertical p-2 space-y-2 py-6 text-base  w-full ">
                    <li
                      onClick={closeProfile}
                      className=" flex justify-end cursor-pointer pb-4 mr-4"
                    >
                      <ImCross />
                    </li>

                    {/* Display user info if available */}
                    <li className="py-1 pl-2">
                      {user?.displayName || "No Name"}
                    </li>
                    <li className="py-1 pl-2">{user?.email || "No Email"}</li>
                    <li className="divider pb-1"></li>

                    <button
                      onClick={handleSignOut}
                      className="bg-primary text-white md:text-lg px-5 py-2 rounded-xl"
                    >
                      Sign Out
                    </button>
                  </ul>
                </div>
              )}
            </div>
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
      <div className="flex justify-center ">
        <div className="navbar-center hidden lg:flex py-2 pb-6">
          <ul className="menu-horizontal px-1 gap-4">{Links}</ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
