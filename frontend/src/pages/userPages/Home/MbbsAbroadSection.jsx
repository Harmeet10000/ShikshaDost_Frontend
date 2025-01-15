"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";

const MbbsAbroadSection = () => {
  return (
    <section className="relative my-10 flex justify-center bg-[#172e59] py-20 overflow-hidden ">
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
      <div className="container relative z-10 mx-4 md:mx-16 flex flex-col items-start gap-y-5 text-white">
        {/* Animated Heading */}
        <motion.h1
          className="max-w-[400px] md:max-w-[600px] font-bold text-2xl md:text-4xl text-left"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          YOUR JOURNEY TO BECOMING TOP GLOBAL DOCTOR!
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          className="font-bold text-gray-300 text-left text-base md:text-lg"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Explore Top MBBS College Abroad!
        </motion.p>

        {/* Animated Button */}
        <ShimmerButton className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-white transition-all">Explore</ShimmerButton>
        {/* <motion.button
          className="px-5 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded font-bold text-xl shadow-md"
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Explore
        </motion.button> */}
      </div>
    </section>
  );
};

export default MbbsAbroadSection;
