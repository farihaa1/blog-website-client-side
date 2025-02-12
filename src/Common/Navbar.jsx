import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            `px-4 py-2 rounded ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : ` ${
                    isScrolled
                      ? "text-gray-500 lg:text-gray-700 "
                      : "text-gray-500 lg:text-gray-500 "
                  }`
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-blogs"
          className={({ isActive }) =>
            `px-4 py-2 rounded  ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : ` ${
                    isScrolled
                      ? "text-gray-500 lg:text-gray-700 "
                      : "text-gray-500 lg:text-gray-500 "
                  }`
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
            `px-4 py-2 rounded ${
              isActive
                ? "bg-btn1 text-white font-semibold"
                : ` ${
                    isScrolled
                      ? "text-gray-500 lg:text-gray-700 "
                      : "text-gray-500 lg:text-gray-500 "
                  }`
            }`
          }
        >
          Featured Blogs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to={`/wishlist/${user?.email}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded ${
                  isActive
                    ? "bg-btn1 text-white font-semibold"
                    : ` ${
                        isScrolled
                          ? "text-gray-500 lg:text-gray-700 "
                          : "text-gray-500 lg:text-gray-500 "
                      }`
                }`
              }
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-blog"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${
                  isActive
                    ? "bg-btn1 text-white font-semibold"
                    : ` ${
                        isScrolled
                          ? "text-gray-500 lg:text-gray-700 "
                          : "text-gray-500 lg:text-gray-500 "
                      }`
                }`
              }
            >
              Add Blog
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  const handleImageError = () => {
    setImageError(true);
  };
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };
  return (
    <motion.div
      animate={{ y: [-100, 0] }}
      transition={{ duration: 2 }}
      className={`fixed top-0 w-full font-poppins py-2 lg:px-10  transition-all duration-300 z-10 ${
        isScrolled
          ? "bg-white bg-opacity-50 backdrop-blur text-base-content"
          : "bg-base-content"
      }`}
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start lg:w-[20%]">
          <div className="dropdown">
            <div tabIndex={0} role="button" 
           
            className={`mr-1 px-2 lg:hidden ${
              isScrolled ? "text-black" : "text-white"
            }`}
            >
              <FaBars className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <ul
              tabIndex={0}
              className=" dropdown-content bg-base-100 rounded z-[1] mt-3 w-52 p-2 shadow space-y-3 pl-4 py-6"
            >
              {Links}
            </ul>
          </div>
          <Link
            to="/"
            className={`text-2xl md:text-3xl font-bold text-white font-inter ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Blog Website
          </Link>
        </div>

        <div className="navbar-center justify-center items-center hidden lg:flex w-[60%]">
          <ul className="menu-horizontal px-1 gap-4">{Links}</ul>
        </div>

        <div className="navbar-end lg:w-[20%]">
          {user ? (
            <div>
              <div
                onClick={toggleProfile}
                className="rounded-full w-10 h-10 md:w-12 md:h-12 cursor-pointer flex justify-center items-center "
              >
                {imageError || !user?.photoURL ? (
                  <div className="w-full h-full bg-primary text-white flex justify-center items-center rounded-full">
                    {getInitials(user.displayName)}
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={user?.photoURL}
                    alt={user.displayName}
                    title={user.displayName}
                    onError={handleImageError}
                  />
                )}
              </div>

              {isProfileOpen && (
                <div
                  className={`absolute top-28 w-72 py-4 rounded-lg right-2 bg-white px-6  z-10 shadow-md  transform transition-transform duration-300 ease-in-out ${
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
                      className="bg-primary text-white md:text-lg px-5 py-2 rounded"
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
                className="bg-primary text-white px-4 rounded py-2 mr-3"
              >
                Register
              </Link>
              <Link
                to="/sign-in"
                className="bg-primary text-white px-4 rounded py-2"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
