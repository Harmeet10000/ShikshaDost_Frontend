
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginMentor } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const MentorLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");

  const mutation = useMutation({
    mutationFn: loginMentor,
    onSuccess: (data) => {
      
      login(data?.result.user);
      console.log("Login Successful:", data);
      // Store token or handle successful login
      if (data?.status === "success") {
        sessionStorage.setItem("userData", JSON.stringify(data?.result.user));
        Cookies.set('authToken',data?.token)
        if (data?.result.user.role === "admin") {
          navigate("/admin/dashboard"); // Navigate to the admin dashboard
        } else if(data?.result.user.role === "mentor") {
          navigate("/mentor/dashboard"); 
        } else {
          navigate("/"); // Navigate to the home page for other users
        }
      }
      setLoginError("");
      reset();
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      alert("Login failed. Please check your credentials.");
      setLoginError("Login failed. Please check your credentials.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className=" mentor-login-section flex flex-col items-center justify-center p-4 md:p-8 ">
      <div className="container ">
        <h1 className=" text-xl md:text-2xl font-bold text-center mb-6 text-[#0B545D]">
          Welcome, Shiksha-Dost Mentor
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Email Field */}
          {loginError && <span className="text-red-500">{loginError}</span>}

          <div className="mb-4">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#0B545D] text-gray-700 py-2"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#0B545D] text-gray-700 py-2"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-gradient-teal mask-diagonal hover:hover-mask-diagonal transition-all duration-500 ease-in-out text-white py-2 px-4 rounded "
          >
            Login as Mentor
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorLogin;
