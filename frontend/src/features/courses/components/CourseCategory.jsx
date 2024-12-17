import React, { useState } from "react";
import { motion } from "framer-motion";

const CourseCategory = ({ setCategory ,category}) => {
 
  return (
    <div className="course-category flex justify-center items-center gap-x-5 rounded-full px-2 py-0 bg-gradient-teal relative">
      {["jee", "neet", "cuet"].map((cat) => (
        <div
          key={cat}
          className={`px-1 md:px-3 py-2 min-w-[80px] md:min-w-[100px] text-center rounded-3xl cursor-pointer relative`}
          onClick={() => setCategory(cat)}
        >
          <span className="uppercase text-lg text-white">{cat}</span>
          {category === cat && (
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-full"
              layoutId="underline"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseCategory;
