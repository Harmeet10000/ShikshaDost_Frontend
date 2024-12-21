import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
  };

  // Watch password to validate confirm password
  const password = watch("password");

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 ">
      <div className=" container">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#0B545D]">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Name Field */}
          <div className="mb-4">
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#0B545D] text-gray-700 py-2"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
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
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
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
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#0B545D] text-gray-700 py-2"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="bg-gradient-teal mask-diagonal hover:hover-mask-diagonal transition-all duration-500 ease-in-out text-white py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
