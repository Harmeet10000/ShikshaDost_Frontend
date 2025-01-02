import React from "react";
import mentor1 from "../../assets/mentor1.jpg";
import mentor2 from "../../assets/mentor2.jpg";
import mentor3 from "../../assets/mentor3.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="hero-section" style={{ backgroundColor: "#172e59" }}>
      <div className="container flex flex-col lg:flex-row items-center justify-between px-8 py-16 mx-auto relative">
        {/* Left Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 text-white z-10"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Personal Mentorship Program
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Unlock your potential with our expert mentorship program, designed
            to guide you every step of the way.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all">
            Join the Mentorship
          </button>
        </motion.div>

        {/* Right Section */}
        <div className="lg:w-1/2 relative flex justify-center items-center border">
          <motion.img
            src={mentor1}
            alt="Mentor 1"
            className="absolute w-40 h-40 rounded-full border-4 border-gray-300 shadow-lg"
            style={{ top: "10%", left: "10%" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.img
            src={mentor2}
            alt="Mentor 2"
            className="absolute w-40 h-40 rounded-full border-4 border-gray-300 shadow-lg"
            style={{ top: "50%", left: "30%" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.img
            src={mentor3}
            alt="Mentor 3"
            className="absolute w-40 h-40 rounded-full border-4 border-gray-300 shadow-lg"
            style={{ top: "30%", left: "70%" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
