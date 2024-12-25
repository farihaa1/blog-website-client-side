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


  console.log(user)
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [search, category]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (category !== "All") params.category = category;

      const res = await axios.get("http://localhost:5000/blogs", { params });

      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch blogs",
        text: "There was an issue fetching blogs. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

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
      await axios.post("http://localhost:5000/wishlist", {
        userId: user.uid,
        blogId,
      });

      Swal.fire({
        icon: "success",
        title: "Added to Wishlist",
        text: "The blog has been added to your wishlist successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "There was an error adding the blog to your wishlist.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      {loading && <progress className="progress w-56"></progress>}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded p-4 shadow min-h-max">
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
