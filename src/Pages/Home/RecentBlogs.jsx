import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/recent-blogs")
      .then((res) => res.json())
      .then((data) => {
        setRecentBlogs(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching recent blogs:", error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  const handleAddToWishlist = async (blogId) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        text: "Please log in to add blogs to your wishlist.",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/wishlist",
        {
          userEmail: user?.email,
          blogId,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.message === "Blog is already in the wishlist") {
        Swal.fire({
          title: "Already Exists",
          text: "This blog is already in your wishlist.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          text: "The blog has been added to your wishlist successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "There was an error adding the blog to your wishlist.",
      });
    }
  };

  return (
    <motion.div
      animate={{ y: [290, 25, 20] }}
      transition={{ delay: 1, duration: 4 }}
      className="container mx-auto px-6 lg:px-16 min-h-screen"
    >
      <h1 className="text-3xl md:text-4xl font-semibold pb-6 text-primary">
        Recent Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-max">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="border rounded p-4 shadow">
                <Skeleton height={200} className="rounded" />
                <Skeleton height={24} width="70%" className="mt-4" />
                <Skeleton height={20} width="90%" className="mt-2" />
                <Skeleton height={20} width="50%" className="mt-2" />
                <div className="flex justify-between mt-4">
                  <Skeleton height={40} width="40%" />
                  <Skeleton height={40} width="40%" />
                </div>
              </div>
            ))
          : recentBlogs.map((blog) => (
              <div key={blog._id} className="border rounded p-4 shadow">
                <img
                  src={blog.imageUrl || "https://via.placeholder.com/150"}
                  alt={blog.title || "Blog Image"}
                  className="w-full h-56 md:h-48 object-cover object-top rounded"
                />
                <h2 className="text-xl font-bold mt-4">{blog.title}</h2>
                <p className="text-gray-600 pt-1 md:pt-2">
                  {blog.shortDescription.slice(0, 200)}....
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Category: {blog.category}
                </p>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleAddToWishlist(blog._id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
      </div>
    </motion.div>
  );
};

export default RecentBlogs;
