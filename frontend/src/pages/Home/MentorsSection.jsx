import ShimmerButton from "@/components/ui/shimmer-button";
import React from "react";

const MentorsList = React.lazy(() => import("./MentorsList"));

// Mentor data array

const MentorsSection = () => {
  return (
    <div className="mentors-section mb-10">
      <div className="container mx-auto flex flex-col gap-y-5 px-4">
        <div className="flex justify-between">
          <h1 className="text-center text-2xl md:text-4xl font-bold">
            Well Experienced Mentors
          </h1>
          <ShimmerButton className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-medium hover:opacity-90">
            View All Mentors
          </ShimmerButton>
        </div>

        {/* Mentor Cards */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <MentorsList />
        </React.Suspense>

        {/* View All Button */}
      </div>
    </div>
  );
};

export default MentorsSection;
