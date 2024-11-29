import React, { useState, useEffect } from "react";
import ApproveFeedCard from "../components/ApproveFeedCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ApproveFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const adminAuthStatus = useSelector((state) => state.adminAuth.status);

  useEffect(() => {
    if (!adminAuthStatus) {
      navigate("/");
    }
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost/sanskala/backend/api/post_approve.php"
        ); // Replace with your API endpoint
        const data = await response.json();
        setPosts(data.posts); // Assuming the response is in the format { posts: [...] }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full h-16 bg-gray-800 z-10"></div>

      <div className="post-container">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="mt-20">
            {
              (console.log(posts),
              posts.map((post) => (
                <ApproveFeedCard key={post.id} post={post} /> // Pass post data to PostCard
              )))
            }
          </div>
        )}
      </div>
    </>
  );
}

export default ApproveFeed;
