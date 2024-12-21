import React from "react";
import { motion } from "framer-motion";

const MbbsAbroadSection = () => {
  return (
    <section className="mbbs-abroad-section my-20 flex justify-center">
      <div className="container flex flex-col justify-center items-center gap-y-3 border bg-[#172e59] text-white mx-0 md:mx-16 rounded-xl py-20">
        {/* Animated Heading */}
        <motion.h1
          className="max-w-[400px] md:max-w-[600px] text-center font-bold text-2xl md:text-4xl"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          YOUR JOURNEY TO BECOMING TOP GLOBAL DOCTOR!
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          className="font-bold text-gray-300"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Explore Top MBBS College Abroad!
        </motion.p>

        {/* Animated Button */}
        <motion.button
          className="px-3 py-2 bg-gradient-teal text-white rounded-full min-w-[150px] font-bold text-lg"
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Explore
        </motion.button>
      </div>
    </section>
  );
};

export default MbbsAbroadSection;
