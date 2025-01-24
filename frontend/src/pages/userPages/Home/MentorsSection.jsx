import CircleLoader from "@/components/loader/CircleLoader";
import ShimmerButton from "@/components/ui/shimmer-button";
import React from "react";
import { Link } from "react-router-dom";

const MentorsList = React.lazy(() => import("./MentorsList"));

// Mentor data array

const MentorsSection = () => {
  return (
    <div className="mentors-section my-20">
      <div className="container mx-auto flex flex-col items-center gap-y-5 px-4">
        <div className="flex flex-col justify-center items-center max-w-5xl  gap-y-5">
          <h1 className="text-center text-xl md:text-3xl font-bold">
          Unlock Your Potential with Our Mentors
          </h1>
          <p className="text-center text-gray-600 text-lg">Gain insights from experienced professionals who have walked the path you&apos;re on. Let their wisdom and guidance help you achieve your dreams.</p>
        </div>

        {/* Mentor Cards */}
        <React.Suspense
          fallback={
            <div>
              <CircleLoader />
            </div>
          }
        >
          <MentorsList />
        </React.Suspense>

        <div className="flex justify-center items-center">
          <Link to="/mentors">
            <ShimmerButton className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-medium hover:opacity-90">
              View All Mentors
            </ShimmerButton>
          </Link>
        </div>

        {/* View All Button */}
      </div>
    </div>
  );
};

export default MentorsSection;
