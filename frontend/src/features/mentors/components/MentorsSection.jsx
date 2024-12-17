import React from "react";

const MentorsList = React.lazy(() => import("./MentorsList"));

// Mentor data array

const MentorsSection = () => {
  return (
    <div className="mentors-section mb-10">
      <div className="container mx-auto flex flex-col gap-y-5 px-4 md:px-8">
        <h1 className="text-center text-2xl md:text-4xl font-bold">
          Well Experienced <span className="text-[#0B545D]">Mentors</span>
        </h1>

        {/* Mentor Cards */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <MentorsList />
        </React.Suspense>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="px-3 py-2 bg-[#0B545D] rounded text-white font-bold min-w-[150px]">
            View All Mentors
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorsSection;
