import React from "react";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import article_gif from "../../assets/articlePage.gif"
const ArticlePageBanner = () => {
  return (
    <section className="relative articlespage-hero-section space-y-2 py-10 px-4 bg-[#172e59] rounded-xl overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-[200%] skew-y-12 z-0"
        )}
      />

      {/* Hero Content */}
      <div className="relative z-10">
        <div>
          <span className="bg-blue-300 p-1 rounded-full">article</span>
        </div>
        <div className="flex  gap-y-4 justify-center items-center">
          <div className="w-full md:w-3/6 space-y-2">
            <h2 className="text-xl sm:text-4xl font-bold text-white">
              Insights & Inspiration
            </h2>
            <p className="text-lg text-gray-300">
              Discover curated articles to help you excel in JEE, NEET, and
              CUET. From preparation tips to motivational stories, we’ve got you
              covered.
            </p>
          </div>
          <div className="w-full md:w-3/6 flex justify-center items-center ">
            <img  src={article_gif} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlePageBanner;
