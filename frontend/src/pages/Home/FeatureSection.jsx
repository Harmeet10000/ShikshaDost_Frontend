import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Brain } from "lucide-react";
import TypingAnimation from "@/components/ui/typing-animation"; // Make sure path is correct

const FeatureSection = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Mentorship",
      description:
        "Get personalized guidance from experienced mentors who've cracked these exams.",
    },
    {
      icon: BookOpen,
      title: "Quality Study Material",
      description:
        "Access comprehensive study resources designed by subject experts.",
    },
    {
      icon: Brain,
      title: "Daily Practice",
      description:
        "Strengthen your concepts with our daily practice problems and quizzes.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose{" "}
          <TypingAnimation
            as="span"
            className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent inline-block"
            duration={150}
            delay={500}
            startOnView={true}
          >
            Shiksha-Dost
          </TypingAnimation>
          ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg"
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{once:true}}
              initial={{
                opacity: 0,
                y: 50,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: index * 0.2, // Add delay for staggered animation
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
