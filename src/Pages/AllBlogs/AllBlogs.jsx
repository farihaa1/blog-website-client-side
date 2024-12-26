import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      fetchBlogs();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [search, category]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/blogs?search=${search}&category=${category}`,
        {
          withCredentials: true,
        }
      );
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (blogId) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        text: "Please log in to add blogs to your wishlist.",
      });
      navigate('/sign-in')
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/wishlist",
        {
          userEmail: user?.email,
          blogId,
        },
        {
          withCredentials: true,
        }
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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>

      {/* Search and Category Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search blogs by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
        </select>
      </div>
      {loading && (
        <div className=" flex justify-center items-center h-80 mt-3 mb-6">
          <progress className="progress w-56"></progress>
        </div>
      )}

      {/* Blog Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded p-4 shadow ">
            <img
              src={blog.imageUrl || "https://via.placeholder.com/150"}
              alt={blog.title || "Blog Image"}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-4">{blog.title}</h2>
            <p className="text-gray-600">{blog.shortDescription}</p>
            <p className="mt-2 text-sm text-gray-500">
              Category: {blog.category}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => navigate(`/blogs/${blog._id}`)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Details
              </button>
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

export default AllBlogs;
