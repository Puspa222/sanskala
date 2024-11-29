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
      <div className="w-full h-screen bg-yellow-100 mt-16">
        <div className="fixed top-0 w-full h-20 bg-stone-950 z-20 text-white font-bold text-center"></div>
        <div className="post-container p-2">
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            <div className="mt-10">
              {
                (console.log(posts),
                posts.map((post) => (
                  <ApproveFeedCard key={post.id} post={post} /> // Pass post data to PostCard
                )))
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ApproveFeed;
