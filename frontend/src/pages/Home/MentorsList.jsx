import React from "react";
import mentor_profile_image from "../../assets/mentor_profile.jpg";
import { mentors } from "@/data/mentors";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const MentorCard = ({ mentor }) => {
  return (
    <div className="mentor-card w-[400px] mx-4 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="relative mentor-profile-image w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
        <div className="absolute inset-0 bg-[#172e59] opacity-10 blur-xl"></div>
        <img
          src={mentor_profile_image}
          alt="mentor_profile"
          className="relative w-full h-full object-cover border-4 border-[#172e59]/20 hover:border-[#172e59]/40 transition-colors shadow-xl"
          loading="lazy"
        />
      </div>

      <div className="mentor-details flex-1 text-center sm:text-left">
        <h2 className="text-xl font-bold text-[#172e59] mb-3">
          {mentor.name}
        </h2>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{mentor.bio}</p>
        <button className="px-4 py-2 bg-[#172e59] text-white rounded-lg hover:bg-[#0f1f3d] transition-all duration-300 text-sm font-medium shadow-lg shadow-[#172e59]/20 hover:shadow-[#172e59]/30">
          View Profile
        </button>
      </div>
    </div>
  );
};

const MentorsList = () => {
  const firstRow = mentors.slice(0, Math.ceil(mentors.length / 2));
  const secondRow = mentors.slice(Math.ceil(mentors.length / 2));

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-50/50 py-10 ">
      <Marquee pauseOnHover className="[--duration:40s] py-4">
        {firstRow.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </Marquee>
      
      <Marquee reverse pauseOnHover className="[--duration:40s] py-4">
        {secondRow.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50/50"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50/50"></div>
    </div>
  );
};

export default MentorsList;