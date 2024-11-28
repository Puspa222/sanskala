import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import profileImage from "../images/profile.png";

function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Feed", path: "/feed" },
    { name: "Share Culture", path: "/add-culture" },
    { name: "Government", path: "/government" },
  ];

  return (
    <div className="relative flex flex-col h-screen bg-gray-900 text-white">
      {/* Profile Icon in Top-Right */}
      <div className="absolute top-4 right-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleProfileMenu}
        />
        {profileMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 text-white w-48 shadow-lg rounded-md">
            <ul className="space-y-2">
              {authStatus && (
                <li className="px-4 py-2 hover:bg-gray-700">Profile</li>
              )}
              {!authStatus && (
                <>
                  <li className="px-4 py-2 hover:bg-gray-700">Login</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Signup</li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Logo and App Name */}
      <div className="flex flex-col items-center py-6">
        <img src="/logo.png" alt="Logo" className="h-16 w-16 rounded-full" />
        <h2 className="text-xl font-semibold mt-2">संस्कला</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
