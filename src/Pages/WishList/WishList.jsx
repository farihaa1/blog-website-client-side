import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const {user} = useContext(AuthContext)
  
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    axios
      .get(`https://blog-website-server-side-9ia7inx76-fariha14s-projects.vercel.app/wishlist/${params.id}`, {
        withCredentials: true
      })
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist!", error);
      });
  }, [params.id]);

  const handleRemoveFromWishlist = async (blogId) => {
   
  
    try {
     const res= await axios.delete("https://blog-website-server-side-9ia7inx76-fariha14s-projects.vercel.app/wishlist", {
        data: {
          userEmail: user?.email,
          blogId,
        },
      });
   
  
      Swal.fire({
        icon: "success",
        title: "Removed from Wishlist",
        text: "The blog has been removed from your wishlist successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      setWishlist(wishlist.filter((blog) => blog._id !== blogId));
  
      // Optionally, refresh the wishlist or update the UI
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "There was an error removing the blog from your wishlist.",
      });
    }
  };
  
  

  const handleViewDetails = (blogId) => {
    // Redirect to blog details page
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="container mx-auto px-6 min-h-screen pt-8 pb-12">
      <h1 className="text-3xl font-semibold text-center my-6 pb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No blogs in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center items-center">
          {wishlist.map((blog) => (
            <div
              key={blog._id}
              className="border shadow-lg rounded-md p-8"
            >
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">Category: {blog.category}</p>
              <p className="text-gray-600">Author: {blog.authorName}</p>
              <div className="flex justify-between items-center mt-4 flex-wrap gap-2 ">
                <button
                  className="bg-primary text-white px-3 py-2 rounded-md"
                  onClick={() => handleViewDetails(blog._id)}
                >
                  View Details
                </button>
                <button
                  className="bg-red-400 text-white px-4 py-2 rounded-md"
                  onClick={() => handleRemoveFromWishlist(blog._id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
