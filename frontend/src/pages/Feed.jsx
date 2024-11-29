import React, { useState, useEffect } from "react";
import FeedCard from "../components/FeedCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost/sanskala/backend/api/post_retrive.php"
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
          (console.log(posts),
          posts.map((post) => (
            <FeedCard key={post.id} post={post} /> // Pass post data to PostCard
          )))
        )}
      </div>
    </>
  );
}

export default Feed;
