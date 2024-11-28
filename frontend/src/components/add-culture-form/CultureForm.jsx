import React, { useState } from "react";
import axios from "axios";

const CultureForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [images, setImages] = useState([]);

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
    formData.append("content", postData.content);

    // Add images (if any)
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }

    try {
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
      // Handle success or error based on response
      if (response.data.message === "Post created successfully!") {
        setSuccessMessage("Post created successfully!");
        setPostData({ title: "", content: "" });
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>

      <form onSubmit={submitPost} className="space-y-4">
        {/* Title Input */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium">Post Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={postData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Content Input */}
        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-medium">Post Content</label>
          <textarea
            name="content"
            id="content"
            value={postData.content}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Enter post content"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image-upload" className="text-sm font-medium">Featured Images</label>
          <input
            type="file"
            id="image-upload"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded"
            accept="image/png, image/jpg, image/jpeg, image/gif"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Post"}
          </button>
        </div>
      </form>

      {/* Display Success or Error Message */}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default CultureForm;
