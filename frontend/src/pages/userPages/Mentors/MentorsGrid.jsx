import React from "react";
import { getAllMentorsListInAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ShimmerButton from "@/components/ui/shimmer-button";

const MentorsGrid = () => {
  const {
    data: mentors,
    isLoading,
    isError,
  } = useQuery(["mentors"], getAllMentorsListInAdmin);

  console.log(mentors);
  if (isLoading) {
    return <div>Loading mentors...</div>;
  }

  if (isError) {
    return <div>Error fetching mentors. Please try again later.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {mentors?.map((mentor) => (
        <div
          key={mentor.id}
          className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center  justify-between text-center gap-y-5"
        >
          <div>
            <div className="flex  justify-center items-center gap-x-4">
              <img
                src={mentor.profile_imageURL || "/default-profile.png"}
                alt={mentor.name}
                className="w-48 h-48 rounded-full mb-4"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">{mentor.name}</h3>
              <p className="text-sm text-gray-600">{mentor.bio}</p>
            </div>
          </div>

          <div>
            <Link to={`/mentors/${mentor.id}`}>
              <ShimmerButton>Go to Profile</ShimmerButton>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorsGrid;
