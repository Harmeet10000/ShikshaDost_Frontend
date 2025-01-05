import React from "react";
import { motion } from "framer-motion";

import ShimmerButton from "@/components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { mentors } from "@/data/mentors";

const MentorsGrid = () => {
  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  // Helper to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.stars, 0);
    return total / reviews.length;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {mentors.map((mentor) => {
        const averageRating = calculateAverageRating(mentor.reviews);

        return (
          <motion.div
            key={mentor.id}
            className="mentor bg-white shadow-lg p-4 rounded-xl flex flex-col items-center justify-between"
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            {/* Mentor Image */}
            <div className="flex flex-col items-center">
              <img
                src={mentor.profile_image}
                className="w-24 h-24 rounded-full object-cover mb-4"
                alt={mentor.name}
              />

              {/* Mentor Info */}
              <h1 className="font-bold text-lg mb-1">{mentor.name}</h1>
              <p className="text-sm text-gray-600 text-center mb-3">
                {mentor.bio}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  {averageRating.toFixed(1)}
                </span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {mentor.categories.map((category, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    +{mentor.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
            {/* View Profile Button */}
            <Link to={`/mentors/${mentor.id}`}>
              <ShimmerButton className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                View Profile
              </ShimmerButton>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MentorsGrid;
