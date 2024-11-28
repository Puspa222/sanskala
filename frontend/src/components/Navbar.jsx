import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import profileImage from "../images/profile.png";
import Logo from "./Logo";
import LogoutBtn from "./LogoutBtn";
import "../css/nav.css"; // Import your custom CSS here

function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) {
      // Persist session logic if needed
    }
  }, []);

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
  const profileItem = [
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="leftnav bg-gray-900 text-white w-64 py-6 flex flex-col justify-between">
        {/* Logo and App Name */}
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-xl font-semibold mt-2">संस्कला</h2>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition duration-300 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="text-center text-sm mt-auto">
          <p>© 2024 संस्कला</p>
        </div>
      </div>

      {/* Profile Icon in Top-Right */}
      <div className="flex-1 relative">
        <div className="fixed top-1 right-1 bg-orange-500 p-1 rounded-xl">
          <div
            className="profile-icon cursor-pointer"
            onClick={toggleProfileMenu}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-gray-300 hover:scale-105 transition-transform"
            />
          </div>

          {/* Profile Dropdown Menu in right side */}
          {profileMenuOpen && (
            <div className="profile-menu absolute right-0 mt-2 bg-white text-gray-800 shadow-lg  w-20 z-10">
              <ul>
                {profileItem.map(
                  (item, index) =>
                    item.active && (
                      <li
                        key={index}
                        className="hover:bg-orange-600 p-2 transition duration-200 bg-orange-500"
                      >
                        <Link
                          to={item.path}
                          className="text-gray-800 hover:text-white"
                        >
                          {item.name}
                        </Link>
                        <hr />
                      </li>
                    )
                )}
                {/* Display Logout button if the user is authenticated */}
                {authStatus && (
                  <ul>
                    <li className="hover:bg-orange-600 p-2 transition duration-200 bg-orange-500">
                      <Link to={"/profile"}>Profile</Link>
                    </li>
                    <li>
                      <LogoutBtn />
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
