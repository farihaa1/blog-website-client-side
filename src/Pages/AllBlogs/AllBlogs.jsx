import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component

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
        `https://blog-website-server-side.vercel.app/blogs?search=${search}&category=${category}`,
        {
          withCredentials: true,
        }
      );
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs");
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
      navigate("/sign-in");
      return;
    }

    try {
      const res = await axios.post(
        "https://blog-website-server-side.vercel.app/wishlist",
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
    <div className="max-w-6xl mx-auto p-6 py-8 lg:py-12">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search blogs by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-1 px-4 rounded w-full input input-bordered text-gray-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border  p-2 rounded  px-4 input input-bordered text-gray-500 select w-56"
        >
          <option className="input text-gray-500 my-1  px-4 py-1 hover:bg-primary hover:text-white" value="All">All Categories</option>
          <option className="input text-gray-500 my-1  px-4 py-1 hover:bg-primary hover:text-white" value="Technology">Technology</option>
          <option className="input text-gray-500 my-1  px-4 py-1 hover:bg-primary hover:text-white" value="Health">Health</option>
          <option className="input text-gray-500 my-1  px-4 py-1 hover:bg-primary hover:text-white" value="Lifestyle">Lifestyle</option>
          <option className="input text-gray-500 my-1  px-4 py-1 hover:bg-primary hover:text-white" value="Education">Education</option>
          <option className="input text-gray-500 my-1  px-4 py-1 hover:bg-primary hover:text-white" value="Travel">Travel</option>
        </select>
        
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded p-4 shadow">
              <Skeleton height={200} />
              <Skeleton count={2} />
              <Skeleton width="60%" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <div key={blog._id} className="border rounded p-4 shadow ">
              <img
                src={blog.imageUrl}
                alt={blog.title || "Blog Image"}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-4">{blog.title}</h2>
              <p className="text-gray-600">
                {blog.shortDescription.slice(0, 250)}...
              </p>
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
      )}
    </div>
  );
};

export default AllBlogs;
