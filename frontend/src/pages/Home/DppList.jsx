import React from "react";
import { Brain, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";



const DppList = () => {
  const quizzes = [
    {
      id: 1,
      title: "JEE Mathematics Mock Test",
      subject: "Mathematics",
      duration: 30,
      description: "Practice questions on Calculus and Algebra",
    },
    {
      id: 2,
      title: "NEET Biology Daily Quiz",
      subject: "Biology",
      duration: 20,
      description: "MCQs on Human Physiology",
    },
    {
      id: 3,
      title: "CUET English Practice",
      subject: "English",
      duration: 15,
      description: "Reading comprehension and vocabulary",
    },
  ];
  return (
    <div className=" dpplist-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {quizzes.map((quiz) => (
        <motion.div
          key={quiz.id}
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">{quiz.subject}</span>
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {quiz.duration} mins
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
          <p className="text-gray-600 mb-4">{quiz.description}</p>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">
            Start Quiz
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default DppList;
