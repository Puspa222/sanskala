import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import profileImage from "../images/profile.png";
import "../css/nav.css";
import Logo from "./Logo";

function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Get the auth status from the Redux store
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Check the session_id in localStorage for persistence after refresh
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) {
      // Optionally, dispatch a login action to update the auth state in Redux if needed
      // dispatch(login({ session_id: sessionId }));  // Uncomment if necessary
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
    </div>
  );
}

export default Navbar;
