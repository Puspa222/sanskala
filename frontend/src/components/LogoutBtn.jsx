import React from "react";
import { logout } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../store/AdminAuthSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Remove session_id from localStorage
    localStorage.removeItem("session_id");

    // Dispatch the logout action to update Redux store
    dispatch(logout());
    dispatch(adminLogout());

    // Redirect to home or login page
    navigate("/", { state: { refresh: Date.now() } });
  };

  return (
    <button
      onClick={logoutHandler}
      className="text-white bg-red-600 hover:bg-red-500 rounded px-1 py-1"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
