import SkeletonLoader from "@/components/loader/SkeletonLoader";
import React from "react";
const LatestArticles = React.lazy(() => import("./LatestArticles"));
const FeaturedArticles = React.lazy(() => import("./FeaturedArticles"));
const SuggestedArticles = React.lazy(() => import("./SuggestedArticles"));
const ArticlesGrid = ({articles}) => {
  return (
    <div className="xl:grid grid-cols-12 px-6 xl:px-0 py-10 gap-10">
      <div className="col-span-8 mb-5">
        <section className="latest-articles-section space-y-10">
          <div>
            <h1 className="text-3xl font-bold mb-3">Latest Articles</h1>
            <React.Suspense fallback={<SkeletonLoader />}>
              <LatestArticles />
            </React.Suspense>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3">Suggested Articles</h1>
            <React.Suspense fallback={<SkeletonLoader />}>
              <SuggestedArticles articles={articles} />
            </React.Suspense>
          </div>
        </section>
      </div>
      <div className="col-span-4 ">
        <h1 className="text-3xl font-bold mb-3">Featured Articles</h1>
        <React.Suspense fallback={<SkeletonLoader />}>
          <FeaturedArticles articles={articles} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default ArticlesGrid;
