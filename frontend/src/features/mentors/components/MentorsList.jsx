import React from "react";
import mentor_profile_image from "../../../assets/mentor_profile.jpg";
import { mentors } from "@/data/mentors";

// Mentor data array

const MentorsList = () => {
  return (
    <div className="mentors-list grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="mentor-card p-6 border rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white"
            >
              <div className="mentor-profile-image w-36 h-36 sm:w-48 sm:h-48">
                <img
                  src={mentor_profile_image}
                  alt="mentor_profile"
                  className="w-full h-full object-cover rounded-full border-4 border-[#0B545D]"
                  loading="lazy"
                />
              </div>

              <div className="mentor-details flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-[#0B545D] mb-2">
                  {mentor.name}
                </h2>
                <p className="text-gray-600 mb-4">{mentor.description}</p>
                <button className="px-5 py-2 bg-[#0B545D] text-white rounded-lg hover:bg-[#083D48] transition duration-300">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
  );
};

export default MentorsList;
