import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/AuthSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); // Clear any previous errors
    try {
      // API call to authenticate the user
      const response = await axios.post(
        "http://localhost/testa/testa1/backend/api/login.php",
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
        setError(error.response.data.message || "Login failed. Please try again.");
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
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-lg bg-gray-200 dark:bg-gray-700 rounded-xl p-10 border border-gray-200 dark:border-gray-600">
        <div className="mb-2 flex justify-center">
          <span className="w-full max-w-[100px] flex items-center justify-center rounded-xl">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline dark:text-blue-400"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="text-red-600 dark:text-red-400 mt-8 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
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
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-white dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;