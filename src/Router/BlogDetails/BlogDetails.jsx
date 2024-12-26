import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const BlogDetails = () => {
  const blogDetails = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //   useEffect(()=>{
  //     fetchComments();
  //   },[])

  if (!blogDetails) return <div>Loading...</div>;

  const isBlogOwner = blogDetails.authorEmail === user.email;

  return (
    <div className="max-w-4xl mx-auto p-6">
        <div>
            <img className="py-10" src={blogDetails.imageUrl} alt="" />
        </div>
      <h1 className="text-3xl font-bold mb-4">{blogDetails.title}</h1>
      <div className="flex gap-6">
      <p className="text-gray-600">Category: {blogDetails.category}</p>
      <p className="text-gray-600">Created At:</p>
      </div>
      <p className="mt-4">{blogDetails.shortDescription}</p>
      <p className="mt-4">{blogDetails.longDescription}</p>
      {isBlogOwner && (
        <button
          onClick={handleUpdateNavigate}
          className="bg-primary text-white px-4 py-2 rounded mt-4"
        >
          Update Blog
        </button>
      )}

      <div className="my-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {!isBlogOwner ? (
          <form  className="mb-6">
            <textarea
              
              className="border p-2 w-full rounded mb-2"
              rows="4"
              placeholder="Write a comment..."
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Submit Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-500">Cannot comment on your own blog.</p>
        )}
       
      </div>
    </div>
  );
};

export default BlogDetails;
