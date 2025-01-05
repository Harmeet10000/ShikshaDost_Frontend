import CircleLoader from "@/components/loader/CircleLoader";
import React from "react";

const MentorsGrid = React.lazy(() => import("./MentorsGrid"));

const Mentors = () => {
  return (
    <section className="mentor-section">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-5xl font-bold text-center mb-2">Our Mentors</h1>
        <p className="text-lg sm:text-xl font-bold text-center mb-5">
          Browse our network of mentors to find the right fit.
        </p>
        <div className="mentorslist-section  px-auto flex justify-center">
          <React.Suspense fallback={<div><CircleLoader/></div>}>
            <MentorsGrid />
          </React.Suspense>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
