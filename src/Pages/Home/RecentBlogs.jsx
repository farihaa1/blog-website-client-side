import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const RecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/recent-blogs", {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((data) => setRecentBlogs(data));
  }, []);

  const handleAddToWishlist = async (blogId) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to add blogs to your wishlist.",
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/wishlist",
        {
          userEmail: user?.email,
          blogId,
        },
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist",
        text: "The blog has been added to your wishlist successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Already Exists",
          text: "This blog is already in your wishlist.",
        });
      } else {
        console.error("Unexpected error:", error); // Log only unexpected errors
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "There was an error adding the blog to your wishlist.",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-6">
      <h1 className="text-2xl md:text-4xl font-semibold pb-6">Recent Blogs</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-max">
        {recentBlogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4 shadow">
            <img
              src={blog.imageUrl || "https://via.placeholder.com/150"}
              alt={blog.title || "Blog Image"}
              className="w-full h-56 md:h-48  object-cover object-top rounded"
            />
            <h2 className="text-xl font-bold mt-4">{blog.title}</h2>
            <p className="text-gray-600 pt-1 md:pt-2">
              {blog.shortDescription.slice(0, 250)}
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
    </div>
  );
};

export default RecentBlogs;
