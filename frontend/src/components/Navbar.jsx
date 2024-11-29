import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import profileImage from "../images/profile.png";
import Logo from "./Logo";
import LogoutBtn from "./LogoutBtn";
import "../css/nav.css";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { adminLogin } from "../store/AdminAuthSlice";

function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const adminAuthStatus = useSelector((state) => state.adminAuth.status);

  const dispatch = useDispatch();
  const [res, setRes] = useState({});

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (sessionId) {
      axios
        .post("http://localhost/sanskala/backend/api/role_check.php", {
          session_id: sessionId,
        })
        .then((response) => {
          console.log(response.data);
          setRes(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, []);

  useEffect(() => {
    if (authStatus && res.role === "admin") {
      dispatch(adminLogin(res.data));
      console.log("Admin Logged In");
    }
  }, [authStatus, res, dispatch]);

  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Feed", path: "/feed" },
    { name: "Share Culture", path: "/add-culture" },
    { name: "Government", path: "/goverment-initiatives" },
  ];

  const profileOptions = authStatus
    ? [{ name: "Profile", path: "/profile" }, { component: <LogoutBtn /> }]
    : [
        { name: "Login", path: "/login" },
        { name: "Signup", path: "/signup" },
      ];

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="fixed top-0 left-0 bg-gradient-to-b from-yellow-600 via-yellow-600 to-yellow-400 text-white w-64 h-full py-6 flex flex-col justify-between shadow-lg z-50">
        {/* Logo and App Name */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-red rounded-full shadow-lg">
            <Logo className="w-[80px] h-[80px] object-cover rounded-full" />
          </div>
          <h2 className="text-3xl font-bold mt-4 text-gray-200">संस्कला</h2>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg font-medium transition duration-300 ${
                  isActive
                    ? "bg-stone-200 text-gray-700"
                    : "hover:bg-stone-300 text-gray-300 hover:text-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {adminAuthStatus && (
            <NavLink
              key={nanoid}
              to={"/approve-feed"}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg font-medium transition duration-300 ${
                  isActive
                    ? "bg-stone-200 text-gray-700"
                    : "hover:bg-stone-300 text-gray-300 hover:text-gray-700"
                }`
              }
            >
              Approve Feed
            </NavLink>
          )}
        </nav>

        {/* Footer */}
        <div className="text-center text-sm text-gray-200 py-4">
          <p>
            © 2024 <span className="font-semibold text-white">संस्कला</span>
          </p>
        </div>
      </aside>

      <div className="top-3 right-4 fixed z-30">
        <div className="cursor-pointer" onClick={toggleProfileMenu}>
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 bg-yellow-500 border border-yellow-500 rounded-full transition duration-300"
          />
        </div>
        {/* Profile Dropdown Menu */}
        {profileMenuOpen && (
          <div className="absolute right-0  bg-gray-50 text-gray-900 shadow-lg w-48 rounded-lg">
            <ul>
              {profileOptions.map((item, index) => (
                <li
                  key={index}
                  className="hover:bg-stone-300 text-stone-900 p-3 rounded-lg transition duration-200 cursor-pointer"
                >
                  {item.component ? (
                    item.component
                  ) : (
                    <Link
                      to={item.path}
                      className="block text-stone-800 hover:text-stone-950"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
