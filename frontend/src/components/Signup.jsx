import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Logo from "./Logo";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
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
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    

      const response = await axios.post("http://localhost/testa/testa1/backend/api/signup.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userData = response.data;
      if (userData) {
          
       
        localStorage.setItem("session_id", userData.session_id);
        console.log(userData);
        dispatch(login(userData));
        navigate("/?Registered");
       
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-lg bg-gray-200 dark:bg-gray-700 rounded-xl p-10 border border-gray-200 dark:border-gray-600">
        <div className="mb-2 flex justify-center">
          <span className=" w-full max-w-[100px] flex items-center justify-center rounded-xl">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline dark:text-blue-400"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 dark:text-red-400 mt-8 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8" encType="multipart/form-data">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Username: "
              placeholder="Enter your username"
              {...register("user", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Input
              label="Profile Picture: "
              type="file"
              accept="image/*"
              {...register("profile_pic")}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-white dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
