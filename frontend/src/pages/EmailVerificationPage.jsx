import React from "react";
import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "@/services/api"; // Adjust the import based on your file structure
import { Link, useParams } from "react-router-dom"; // To access the token from the URL
import { toast } from "sonner"; // To show toast notifications

const EmailVerificationPage = () => {
  const { token } = useParams(); // Extract token from the URL
  console.log(token);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => verifyEmail(token),
    onSuccess: (data) => {
      toast.success("Email successfully verified!");
    },
    onError: (error) => {
      toast.error("Failed to verify email.");
      console.error("Verification Error:", error);
    },
    enabled: !!token, // Ensure the query only runs if a token is present
  });

  if (!token) {
    return <div>Invalid verification link.</div>;
  }

  if (isLoading) {
    return <div>Verifying your email...</div>;
  }

  if (isError) {
    return <div>Failed to verify your email. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center gap-y-5">
      <h1 className="text-3xl font-bold">Email Verification</h1>
      <p>Your email has been successfully verified!</p>
      <button className="p-2 bg-[#172e59] text-white">
        <Link to={"/register"}>Go to Login</Link>
      </button>
    </div>
  );
};

export default EmailVerificationPage;
