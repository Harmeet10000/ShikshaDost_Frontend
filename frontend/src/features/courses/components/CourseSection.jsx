import React, { useState, useRef } from "react";

import { AnimatePresence } from "framer-motion";
import CourseCategory from "./CourseCategory";

const CourseList = React.lazy(() => import("./CourseList"));

const CourseSection = () => {
  const [category, setCategory] = useState("jee");

  return (
    <div className="all-courses-list flex flex-col gap-y-5 mb-10">
      {/* Category Selection */}
      <div className="flex justify-center items-center">
        <CourseCategory setCategory={setCategory} category={category} />
      </div>

      {/* Courses Carousel */}
      <div className="courses-list px-4 md:px-16">
        <AnimatePresence mode="wait">
          <React.Suspense fallback={<div>Loading...</div>}>
            <CourseList category={category} />
          </React.Suspense>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseSection;
