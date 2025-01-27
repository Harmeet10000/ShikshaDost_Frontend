import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import GridPattern from "@/components/ui/grid-pattern";
import article_gif from "../../../assets/articleHero.svg";
const ArticlePageBanner = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);

    setTilt({ rotateX: -y * 15, rotateY: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };
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
      <div className="">
        <div className="flex flex-col-reverse md:flex-row gap-y-4 justify-center items-center">
          <div className="w-full md:w-3/6 flex flex-col gap-y-3 ">
            <div>
              <span className="bg-white p-1 rounded-full">article</span>
            </div>

            <h2 className="text-xl sm:text-5xl font-bold text-white">
              Insights & Inspiration
            </h2>
            <p className="text-xl text-gray-300">
              Discover curated articles to help you excel in JEE, NEET, and
              CUET. From preparation tips to motivational stories, we’ve got you
              covered.
            </p>
          </div>
          <div
            className="w-full md:w-3/6 flex justify-center items-center rounded-xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.img
              className="w-full h-96 rounded-xl"
              src={article_gif}
              style={{ perspective: "1000px" }}
              animate={tilt}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlePageBanner;
