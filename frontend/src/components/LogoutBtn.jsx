import React from "react";
import { logout } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutBtn(width = "100px") {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    //const session = deleting session logic
    if (session) {
      dispatch(logout());
    }
    navigate("/");
  };
  return (
    <button width={width} onClick={logoutHandler} className="text-white">
      Logout
    </button>
  );
}

export default LogoutBtn;
