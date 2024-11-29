import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function FeedCard({ post }) {
  const images = post?.featured_images ? JSON.parse(post.featured_images) : [];
  const [approveMsg, setApproveMsg] = useState("");
  const navigate = useNavigate();


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
          navigate("/feed");
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [approveMsg]);


  return (
    <div className="bg-gray-800 p-6   rounded-3xl shadow-lg border overflow-hidden transition-transform transform hover:scale-100 hover:shadow-2xl max-w-4xl mx-auto z-0">
      <div className="relative w-full ">
        {images.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center overflow-x-auto space-x-2">
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
        <h4 className="text-gray-800 bg-yellow-100 p-3 rounded-xl">Author: <span className="font-bold">{post?.username || "Unknown"}</span></h4>
        <h4 className="text-gray-800 bg-yellow-100 p-3 rounded-xl">Category: <span className="font-bold">{post?.category || "N/A"}</span></h4>
        <p className="text-base text-gray-800 bg-yellow-200 p-3 rounded-xl">
          Description: <span className="">{post?.content || "No description available."}</span>
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={approveFeed}
            className="bg-green-500 hover:bg-green-400 p-3 rounded-lg w-24"
          >
            Approve
          </button>
          <button
            onClick={rejectFeed}
            className="bg-red-500 hover:bg-red-400 p-3 rounded-lg w-24"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
