import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import profileImage from "./images/profile.png";
import Logo from "./Logo";

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
    { name: "Share Culture", path: "/share-culture" },
    { name: "Government", path: "/government" },
  ];

  const profileItem = [
    { name: "Profile", path: "/profile", active: authStatus },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Signup", path: "/signup", active: !authStatus },
  ];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center gap-2 p-4">
        <Logo />
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-100">
          संस्कला
        </h2>
      </div>

      <nav className="flex-1 flex flex-col gap-4 p-4">
        {navItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex items-center gap-3 p-3 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <i className="icon-home"></i>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <footer className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© 2024 संस्कला</p>
      </footer>

      {/* Profile Icon and Menu */}
      <div className="absolute top-4 right-4">
        <div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
          onClick={toggleProfileMenu}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {profileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
            <ul className="py-2">
              {profileItem.map(
                (item, index) =>
                  item.active && (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                    >
                      <NavLink
                        to={item.path}
                        className="block text-gray-700 dark:text-gray-100"
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
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
