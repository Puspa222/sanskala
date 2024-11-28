import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/AuthSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      // api to login and get response
      //const session =
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-lg bg-gray-200 dark:bg-gray-700 rounded-xl p-10 border border-gray-200 dark:border-gray-600">
        <div className="mb-2 flex justify-center">
          <span className=" w-full max-w-[100px] flex items-center rounded-xl justify-center">
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