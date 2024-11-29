import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/AuthSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import axios from "axios";

function Login() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus) {
      navigate("/");
    }
  }, []);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); // Clear any previous errors
    try {
      // API call to authenticate the user
      const response = await axios.post(
        "http://localhost/sanskala/backend/api/login.php",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const { status, session_id, message } = response.data;

      if (status === "success" && session_id) {
        // Save session_id in local storage
        localStorage.setItem("session_id", session_id);

        // Dispatch the Redux login action
        dispatch(storeLogin(response.data));

        // Navigate to the homepage
        navigate("/");
      } else {
        // Display backend error message or fallback error
        setError(message || "Invalid email or password.");
      }
    } catch (error) {
      // Handle API or network errors
      if (error.response) {
        // Backend responded with an error
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        // No response received
        setError("No response from server. Please check your connection.");
      } else {
        // Other errors
        setError("An error occurred while logging in. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600">
      <div className="mx-auto w-full max-w-sm bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600 transform transition duration-300 hover:scale-105">
        <div className="mb-3 flex justify-center">
          <span className="w-full max-w-[60px] flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 p-2 shadow-md">
            <Logo width="60%" />
          </span>
        </div>
        <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-white leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-1 text-center text-xs text-gray-600 dark:text-gray-300">
          Don't have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-orange-600 dark:text-orange-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="text-red-600 dark:text-red-400 mt-2 text-center text-xs font-medium">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-4 space-y-3">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="rounded-lg border-orange-300 text-xs"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="rounded-lg border-orange-300 text-xs"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <Button
            type="submit"
            className="w-full py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-xs rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
