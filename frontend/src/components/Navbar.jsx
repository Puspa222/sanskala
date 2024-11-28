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
    { name: "Goverment", path: "/Goverment" },
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
    <div className="flex  h-screen p-1">
   {/* Left Sidebar */}
<div className="fixed top-0 left-0 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-700 text-white w-64 h-full py-6 flex flex-col justify-between shadow-lg z-50">
  {/* Logo and App Name */}
  <div className="flex flex-col items-center">
    <div className="p-2 bg-white rounded-full shadow-lg">
      <Logo className="w-[45px] h-[45px] object-cover rounded-full " />
    </div>
    <h2 className="text-4xl font-semibold mt-4 text--100">संस्कला</h2>
  </div>

  {/* Navigation Links */}
  <nav className="mt-8 space-y-2">
    {navItems.map((item, index) => (
      <NavLink
        key={index}
        to={item.path}
        className={({ isActive }) =>
          `block py-3 px-4 rounded-lg text-white font-medium transition duration-300 ${
            isActive
              ? "bg-gray-700 shadow-md"
              : "hover:bg-gray-800 hover:shadow-lg"
          }`
        }
      >
        {item.name}
      </NavLink>
    ))}
  </nav>

  {/* Footer */}
  <div className="text-center text-sm mt-auto text-gray-400 py-4">
    <p>© 2024 <span className="font-semibold text-stone-950">संस्कला</span></p>
  </div>
</div>

{/* Profile Icon in Top-Right */}
<div className="fixed top-1 right-1 bg-transparent p-2 rounded-xl z-50">
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

  {/* Profile Dropdown Menu */}
  {profileMenuOpen && (
    <div className="profile-menu absolute right-0 mt-2 bg-white text-gray-800 shadow-lg w-48 rounded-lg z-50">
      <ul>
        {profileItem.map(
          (item, index) =>
            item.active && (
              <li
                key={index}
                className="hover:bg-blue-600 p-3 rounded-lg transition duration-200 bg-white cursor-pointer"
              >
                <Link
                  to={item.path}
                  className="text-gray-800 hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            )
        )}
        {/* Display Logout button if the user is authenticated */}
        {authStatus && (
          <>
            <li className="hover:bg-blue-600 p-3 rounded-lg transition duration-200 bg-white cursor-pointer">
              <Link to={"/profile"} className="text-gray-800 hover:text-white">
                Profile
              </Link>
            </li>
            <li className="hover:bg-red-600 p-3 rounded-lg transition duration-200 bg-white cursor-pointer">
              <LogoutBtn />
            </li>
          </>
        )}
      </ul>
    </div>
  )}
 </div>
    </div>
  );
}

export default Navbar;
