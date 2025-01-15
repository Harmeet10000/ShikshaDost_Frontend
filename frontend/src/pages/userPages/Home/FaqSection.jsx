import React, { useState } from "react";
import { motion } from "framer-motion";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is Shiksha-Dost?",
      answer: "Shiksha-Dost is a platform offering personalized guidance and study materials for competitive exams.",
    },
    {
      question: "How can I access the resources?",
      answer: "You can access the resources by signing up on our platform and exploring the library section.",
    },
    {
      question: "Is there a mentorship program?",
      answer: "Yes, we provide one-on-one mentorship with experts who have excelled in competitive exams.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <motion.div
                  initial={{ rotate: activeIndex === index ? 0 : 90 }}
                  animate={{ rotate: activeIndex === index ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl font-bold">+</span>
                </motion.div>
              </div>

              {/* Answer */}
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
