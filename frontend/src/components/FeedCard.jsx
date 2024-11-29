import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function FeedCard({ post }) {
  const images = post?.featured_images ? JSON.parse(post.featured_images) : [];
  const { register, handleSubmit, reset } = useForm();
  const [comments, setComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const authStatus = useSelector((state) => state.auth.status);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost/sanskala/backend/api/comment.php?pid=${post.id}`
        );
        if (response.data.status === "success") {
          setComments(response.data.comments);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [post.id]);

  // Handle submitting a new comment
  const addComment = async (data) => {
    data.pid = post.id;
    const session_id = localStorage.getItem("session_id");
    data.session_id = session_id;

    try {
      const response = await axios.post(
        "http://localhost/sanskala/backend/api/comment.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setSuccessMsg("Comment added successfully!");
        setErrorMsg("");
        reset();
        // Fetch updated comments
        setComments((prevComments) => [
          ...prevComments,
          {
            comment: data.comment,
            username: "You", // Update this if username is included in the response
          },
        ]);
      } else {
        setErrorMsg(response.data.message || "Failed to add comment.");
        setSuccessMsg("");
      }
    } catch (error) {
      setErrorMsg("Error submitting comment.");
      setSuccessMsg("");
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border overflow-hidden transition-transform transform hover:scale-100 hover:shadow-2xl mt-6 max-w-3xl mx-auto">
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
        <p className="text-base bg-stone-200 text-gray-900 p-5">
          {post?.content || "No description available."}
        </p>

        {!authStatus && (
          <>
            <p>
              Please{" "}
              <Link to="/login" className="text-blue-400">
                Login
              </Link>{" "}
              to comment.
            </p>
          </>
        )}

        {authStatus && (
          <form onSubmit={handleSubmit(addComment)} className="space-y-2">
            <Input
              type="text"
              placeholder="Write your comment"
              className="w-full border rounded-lg px-4 py-2"
              {...register("comment", { required: "Comment is required" })}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Add Comment
            </Button>
          </form>
        )}

        {successMsg && <p className="text-green-500 text-xs">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}

        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-700">Comments:</h4>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start bg-gray-100 p-3 rounded-lg mt-3"
              >
                {/* Comment Content */}
                <div>
                  {/* Username and Timestamp */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">
                      Username: {comment.username}
                    </p>
                    <span className="text-xs text-gray-500 ml-4">
                      Commented at:{" "}
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  {/* Comment Text */}
                  <p className="text-base text-gray-900 mt-1">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-2">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
