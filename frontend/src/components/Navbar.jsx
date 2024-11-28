import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import profileImage from "./images/hamro.jpg";
import "../css/nav.css";
import Logo from "./Logo";

function Navbar() {
  // State for the profile menu toggle (open/close)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Explore",
      path: "/explore",
    },
    {
      name: "Feed",
      path: "/feed",
    },
    {
      name: "Share Culture",
      path: "/share-culture",
    },
    {
      name: "Government",
      path: "/government",
    },
    {},
  ];

  const profileItem = [
    {
      name: "Profile",
      path: "/profile",
      active: authStatus,
    },
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
    <div className="navbar-contents">
      <div className="leftnav">
        <div className="flex-col items-center gap-1">
          <Logo />
          <h2 className="text-center">संस्कला</h2>
        </div>
        <nav className="nav-links">
          {navItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="nav-item">
              <i className="icon-home"></i>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="footer-section">
          <p>© 2024 संस्कला</p>
        </div>
      </div>
      {/* Right Sidebar */}
      {/* Profile Icon */}
      <div className="rightnav">
        <div className="profile-icon" onClick={toggleProfileMenu}>
          <img src={profileImage} alt="Profile" />
        </div>

        {/* Profile Menu */}
        {profileMenuOpen && (
          <div className="profile-menu">
            <ul>
              {profileItem.map(
                (item, index) =>
                  item.active && (
                    <li key={index}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  )
              )}
              {authStatus && (
                <li key={nanoid}>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
