import React from "react";

import ShimmerButton from "@/components/ui/shimmer-button";
import CircleLoader from "@/components/loader/CircleLoader";
import { Link } from "react-router-dom";

const ArticleList = React.lazy(() => import("./ArticleList"));

const FeaturedArticles = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl md:text-3xl font-bold">Featured Articles</h1>
          <Link to={"/articles"}>
            <ShimmerButton className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-medium hover:opacity-90">
              View All Articles
            </ShimmerButton>
          </Link>
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
      </div>
    </div>
  );
};

export default FeaturedArticles;
