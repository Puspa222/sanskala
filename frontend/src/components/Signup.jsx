import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Logo from "./Logo";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Signup() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus) {
      navigate("/");
    }
  }, []);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("user", data.user);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.profile_pic[0]) {
        formData.append("profile_pic", data.profile_pic[0]);
      }

      const response = await axios.post(
        "http://localhost/sanskala/backend/api/signup.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const userData = response.data;
      if (userData) {
        localStorage.setItem("session_id", userData.session_id);
        dispatch(login(userData));
        window.location.reload();

        navigate("/?Register_Successful", { state: { refresh: Date.now() } });
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
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
          Create Account
        </h2>
        <p className="mt-1 text-center text-xs text-gray-600 dark:text-gray-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-orange-600 dark:text-orange-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 dark:text-red-400 mt-2 text-center text-xs font-medium">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit(create)}
          className="mt-4 space-y-3"
          encType="multipart/form-data"
        >
          <Input
            label="Full Name"
            placeholder="Full name"
            className="rounded-lg border-orange-300 text-xs"
            {...register("name", { required: true })}
          />
          <Input
            label="Username"
            placeholder="Username"
            className="rounded-lg border-orange-300 text-xs"
            {...register("user", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Email"
            type="email"
            className="rounded-lg border-orange-300 text-xs"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email format",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            className="rounded-lg border-orange-300 text-xs"
            {...register("password", { required: true })}
          />
          <Input
            label="Profile Picture"
            type="file"
            accept="image/*"
            className="rounded-lg border-orange-300 text-xs"
            {...register("profile_pic")}
          />
          <Button
            type="submit"
            className="w-full py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-xs rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
