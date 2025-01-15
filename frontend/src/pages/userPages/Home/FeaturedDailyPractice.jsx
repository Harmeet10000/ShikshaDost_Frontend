import React from "react";

import { motion } from "framer-motion";
import ShimmerButton from "@/components/ui/shimmer-button";
import CircleLoader from "@/components/loader/CircleLoader";

const DppList = React.lazy(() => import("./DppList"));

const FeaturedDailyPractice = () => {
  return (
    <div className="Dpp-section my-20">
      <div className="container mx-auto flex flex-col items-center gap-y-5 px-4">
        {/* Header with View More Button */}
        <div className="flex flex-col justify-center items-center max-w-5xl  gap-y-5">
          <motion.h1
            className="text-center text-xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Practice Makes Progress
          </motion.h1>
          <p className="text-center text-gray-600 text-lg">
            Take on challenges, test your knowledge, and watch yourself improve
            one step at a time. Turn practice into a rewarding journey of
            growth.
          </p>
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
        <div>
          <ShimmerButton className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-medium hover:opacity-90">
            View All DPPs
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDailyPractice;
