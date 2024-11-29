import React, { useState, useEffect } from "react";
import axios from "axios";


function FeedCard({ post }) {
  const images = post?.featured_images ? JSON.parse(post.featured_images) : [];
  const [approveMsg, setApproveMsg] = useState("");


  const approveFeed = () => {
    setApproveMsg("approved");
  };
  const rejectFeed = () => {
    setApproveMsg("rejected");
  };

  useEffect(() => {
    if (approveMsg) {
      axios
        .post("http://localhost/sanskala/backend/api//post_approve_response.php", {
          postId: post.id,
          status: approveMsg,
        })
        .then((response) => {
          console.log(response.data);
        
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [approveMsg]);


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl max-w-4xl mx-auto">
      <div className="relative w-full">
        {images.length > 0 ? (
          <div className="flex overflow-x-auto space-x-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost/sanskala/backend/${image.substring(3)}`}
                alt={`Featured ${index + 1}`}
                className="w-72 h-72 object-cover rounded-lg p-2 border"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Images Available</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          Title: {post?.title || "Untitled"}
        </h3>
        <h4 className="text-gray-800">Author: {post?.username || "Unknown"}</h4>
        <h4 className="text-gray-800">Category: {post?.category || "N/A"}</h4>
        <p className="text-sm text-gray-600">
          Description: {post?.content || "No description available."}
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={approveFeed}
            className="bg-green-500 hover:bg-green-400"
          >
            Approve
          </button>
          <button
            onClick={rejectFeed}
            className="bg-red-500 hover:bg-green-400"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
