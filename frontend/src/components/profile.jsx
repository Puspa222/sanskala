import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutBtn from "./LogoutBtn";
import profileImage from "../images/profile.png"; // Default image

function Profile() {
  const [user, setUser] = useState(null); // State to hold user data
  const navigate = useNavigate();

  // Fetch the session ID from local storage
  const sessionId = localStorage.getItem("session_id");

  // Fetch user data on component mount
  useEffect(() => {
    if (!sessionId) {
      // If no session ID, redirect to login
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "http://localhost/sanskala/backend/api/profile.php",
          { session_id: sessionId }, // Make sure this is correctly sent
          {
            headers: {
              "Content-Type": "application/json", // Set content type
            },
          }
        );
        console.log(response.data);
        if (response.data.status === "success") {
          setUser(response.data.user);
        } else {
          console.error("Error:", response.data.message);
          // Optionally handle the case when the session ID is invalid or expired
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sessionId, navigate]);

  const handleLogout = () => {
    // Clear session and redirect to login
    localStorage.removeItem("session_id");
    navigate("/login");
  };

  if (!user) {
    // Display a loading state or placeholder
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-100">
        <p className="text-gray-800 dark:text-gray-200">Loading profile...</p>
      </div>
    );
  }

  // If the profile picture exists, use the URL, else fallback to the default image
  const profilePicUrl = user.profile_pic
    ? `http://localhost/sanskala/backend/${user.profile_pic}` // Full URL for profile pic
    : profileImage; // Fallback image

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="fixed top-0 w-full h-20 bg-stone-950 z-20 text-white font-bold text-center"></div>

      <div className="w-full max-w-lg bg-gray-200 dark:bg-gray-900 rounded-xl p-10">
        <div className="flex justify-center mb-4">
          <img
            src={profilePicUrl} // Dynamically set the profile pic
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600"
          />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {user.name}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          {user.email}
        </p>
        <div className="mt-6"></div>
        <div className="mt-4">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}

export default Profile;
