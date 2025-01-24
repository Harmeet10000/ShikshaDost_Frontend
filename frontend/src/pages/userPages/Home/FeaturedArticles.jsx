import React from "react";

import ShimmerButton from "@/components/ui/shimmer-button";
import CircleLoader from "@/components/loader/CircleLoader";
import { Link } from "react-router-dom";

const ArticleList = React.lazy(() => import("./ArticleList"));

const FeaturedArticles = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-y-5">
        <div className="flex flex-col justify-center items-center max-w-5xl  gap-y-5">
          <h1 className="text-center text-xl md:text-3xl font-bold">
            Empower Your Learning Journey
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Get inspired with articles that explore strategies, innovations, and
            success stories to help you build and grow your vision.
          </p>
        </div>

        <React.Suspense
          fallback={
            <div>
              <CircleLoader />
            </div>
          }
        >
          <ArticleList />
        </React.Suspense>

        <div className="flex justify-center items-center">
          <Link to={"/articles"}>
            <ShimmerButton className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-medium hover:opacity-90">
              View All Articles
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
