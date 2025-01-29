import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileIntro = ({ mentorDetails, setIsDialogOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookSession = () => {
    if (!user) {
      navigate("/register");
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col items-center ">
      <img
        src={mentorDetails?.profile_imageURL}
        alt={mentorDetails?.name}
        className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4"
      />
      <h1 className="text-2xl font-bold mb-2 text-center">
        {mentorDetails?.name}
      </h1>
      <p className="text-sm text-gray-300 mb-4 text-center">
        {mentorDetails?.bio}
      </p>
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
          onClick={handleBookSession}
        >
          Book 1:1 Session
        </button>
      </div>
    </div>
  );
};

export default ProfileIntro;
