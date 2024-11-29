import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CultureForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [images, setImages] = useState([]);

  const authStatus = useSelector((state) => state.auth.status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    const sessionId = localStorage.getItem("session_id"); // Retrieve session_id from local storage

    // Add session_id to the form data
    formData.append("session_id", sessionId);

    // Add other post data (title, content)
    formData.append("title", postData.title);
    formData.append("category", postData.category);
    formData.append("content", postData.content);

    // Add images (if any)
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }

    try {
      setErrorMessage("");
      const response = await axios.post(
        "http://localhost/sanskala/backend/api/post.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post response:", response.data);
      console.log("Post response:", response.data.message);
      // Handle success or error based on response
      if (response.data.message === "success") {
        setSuccessMessage("Post created successfully!");
        setPostData({ title: "", content: "" });
        navigate("/feed?Post Created Successfully"); // Redirect to the homepage
        setImages([]);
      } else {
        setErrorMessage("Failed to create post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-yellow-100 pt-8 mt-14">
        <div className="fixed top-0 w-full h-20 bg-stone-950 z-20 text-white font-bold text-center"></div>
        <div className="container mx-auto p-6 max-w-md bg-bisque shadow-lg rounded-lg border border-gray-200 bg-gray-800 text-white">
          {!authStatus && (
            <h1 className="text-center text-lg font-semibold mb-4 text-brown-700 mt-20">
              Login to Share The Culture.{" "}
              <Link
                to="/login"
                className="text-blue-600 underline hover:text-blue-800 transition duration-200"
              >
                Login Now
              </Link>
            </h1>
          )}

          {authStatus && (
            <span>
              <h2 className="text-2xl font-semibold mb-4 text-center text-brown-700">
                Create New Post
              </h2>
              <form onSubmit={submitPost} className="space-y-6 text-black">
                {/* Title Input */}
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium mb-1 text-brown-600 text-white"
                  >
                    Post Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={postData.title}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 transition duration-200"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium mb-1 text-brown-600 text-white"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={postData.category || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 transition duration-200"
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="festival">Festival</option>
                    <option value="dance">Dance</option>
                    <option value="foods">Food</option>
                    <option value="art and music">Art and Music</option>
                    <option value="language">Language</option>
                    <option value="other">Others</option>
                  </select>
                </div>

                {/* Content Input */}
                <div className="flex flex-col">
                  <label
                    htmlFor="content"
                    className="text-sm font-medium mb-1 text-brown-600 text-white"
                  >
                    Post Content
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    value={postData.content}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 transition duration-200"
                    placeholder="Enter post content"
                    rows="5"
                    required
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                  <label
                    htmlFor="image-upload"
                    className="text-sm font-medium mb-1 text-brown-600 text-white"
                  >
                    Featured Images
                  </label>
                  <input
                    type="file"
                    required
                    id="image-upload"
                    multiple
                    onChange={handleFileChange}
                    className="border text-white border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 transition duration-200"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white py-2 px-6 rounded-md shadow hover:bg-brown-600 transition duration-200"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Post"}
                  </button>
                </div>
              </form>

              {/* Display Success or Error Message */}
              {successMessage && (
                <p className="text-green-500 mt-4 text-center font-medium">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-red-500 mt-4 text-center font-medium">
                  {errorMessage}
                </p>
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CultureForm;
