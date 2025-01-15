"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import mentor1 from "../../../assets/mentor1.jpg";
import mentor2 from "../../../assets/mentor2.jpg";
import mentor3 from "../../../assets/mentor3.jpg";
import GridPattern from "@/components/ui/grid-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import hero from "../../../assets/hero.jpg";

const HeroSection = () => {
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
    <section
      className="hero-section relative flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#172e59" }}
    >
      {/* Grid Pattern */}
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
        ]}
        className="absolute inset-0 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)] skew-y-12 opacity-20"
      />

      <div className="container flex flex-col lg:flex-row items-center justify-between px-8 py-16 mx-auto relative z-10">
        {/* Left Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="lg:w-1/2 flex flex-col items-start justify-center lg:text-left mb-8 lg:mb-0 text-white"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Personal Mentorship Program
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Unlock your potential with our expert mentorship program, designed
            to guide you every step of the way.
          </p>
          <ShimmerButton className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-white transition-all">
            Join the Mentorship
          </ShimmerButton>
        </motion.div>

        {/* Right Section */}
        <div
          className="w-full lg:w-1/2 flex justify-center items-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            src={hero}
            alt="Hero Image"
            className="top-5 left-20 w-full h-full rounded-xl shadow-lg object-cover"
            style={{ perspective: "1000px" }}
            animate={tilt}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
