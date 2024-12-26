import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const AddBlog = () => {
  const [blog, setBlog] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, []);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const imageUrl = form.imageUrl.value;
    const category = form.category.value;
    const shortDescription = parseInt(form.shortDescription.value);
    const longDescription = form.longDescription.value;
    
    const blogData = {
      title,
      imageUrl,
      category,
      shortDescription,
      longDescription,
      authorEmail: user.email
    };

    try {
      const res = await axios.post("http://localhost:5000/blogs", blogData);
      const newBlog = res.data;

      setBlog([...blog, newBlog]);

      Swal.fire({
        icon: "success",
        title: "Blog Added",
        text: "Your blog has been added successfully!",
      });

      // Optionally navigate to another page after submission
      // navigate('/blogs');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 py-4 md:py-6 lg:py-12">
      <h1 className="text-2xl font-bold mb-6 my-4">Add a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            name="shortDescription"
           
            rows="3"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Long Description</label>
          <textarea
            name="longDescription"
            rows="6"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
