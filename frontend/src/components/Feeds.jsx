import React, { useState, useEffect } from "react";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts"); // Fetch posts from the API
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Fetch comments for a specific post
  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
      setActivePost(postId);
      setShowComments(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Close the comments section
  const closeComments = () => {
    setShowComments(false);
    setActivePost(null);
    setComments([]);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Post Header */}
          <div className="p-4 flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={post.author.photo}
              alt={post.author.name}
            />
            <div className="ml-4">
              <p className="text-gray-700 font-semibold">{post.author.name}</p>
              <p className="text-gray-500 text-sm">{post.createdAt}</p>
            </div>
          </div>

          {/* Post Images with Descriptions */}
          <div className="relative">
            <div className="flex flex-col overflow-x-scroll scrollbar-hide">
              {post.images.map((image, index) => (
                <div key={index} className="mb-4">
                  <img
                    src={image.url}
                    alt={`Slide ${index}`}
                    className="h-64 w-full object-cover"
                  />
                  {image.description && (
                    <p className="text-gray-600 text-sm mt-2 px-4">
                      {image.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <p className="text-gray-700">{post.content}</p>
          </div>

          {/* Action Buttons */}
          <div className="p-4 flex justify-between items-center border-t">
            <button
              className="flex items-center text-gray-500 hover:text-blue-500"
              onClick={() => alert("Liked!")}
            >
              <i className="fas fa-thumbs-up mr-2"></i> Like
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-blue-500"
              onClick={() => fetchComments(post.id)}
            >
              <i className="fas fa-comment mr-2"></i> Comment
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-blue-500"
            >
              <i className="fas fa-share mr-2"></i> Share
            </button>
          </div>
        </div>
      ))}

      {/* Comments Section */}
      {showComments && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 font-semibold">Comments</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeComments}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start mb-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={comment.user.photo}
                    alt={comment.user.name}
                  />
                  <div className="ml-4">
                    <p className="text-gray-700 font-semibold">
                      {comment.user.name}
                    </p>
                    <p className="text-gray-500">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Feed;