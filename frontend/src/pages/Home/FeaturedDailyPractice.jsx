import React from "react";

import { motion } from "framer-motion";
import ShimmerButton from "@/components/ui/shimmer-button";
import CircleLoader from "@/components/loader/CircleLoader";

const DppList = React.lazy(() => import("./DppList"));

const FeaturedDailyPractice = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with View More Button */}
        <div className="flex justify-between items-center mb-5">
          <motion.h1
            className="text-xl md:text-3xl font-bold "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Daily Practice
          </motion.h1>
          <ShimmerButton className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-medium hover:opacity-90">
            View All DPPs
          </ShimmerButton>
        </div>

        {/* Quizzes Grid */}
        <React.Suspense
          fallback={
            <div>
              <CircleLoader />
            </div>
          }
        >
          <DppList />
        </React.Suspense>
      </div>
    </div>
  );
};

export default FeaturedDailyPractice;
