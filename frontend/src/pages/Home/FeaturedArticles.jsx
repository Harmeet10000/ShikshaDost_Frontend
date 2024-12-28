import React from "react";
import { ThumbsUp, MessageCircle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import ShimmerButton from "@/components/ui/shimmer-button";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const hoverEffect = {
  scale: 1.05,
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
};

const FeaturedArticles = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl md:text-4xl font-bold">Featured Articles</h1>
          <ShimmerButton className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-medium hover:opacity-90">
            View All Articles
          </ShimmerButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={hoverEffect}
            >
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{article.author}</h3>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span className="mr-4">{article.likes}</span>
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{article.comments}</span>
                </div>
                <button className="flex items-center text-teal-500 hover:underline font-medium">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Read Article
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const articles = [
  {
    id: 1,
    title: "How to Crack JEE Advanced: A Comprehensive Guide",
    author: "Dr. Rajesh Kumar",
    authorImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300&h=300",
    date: "Mar 15, 2024",
    excerpt:
      "Learn the proven strategies and tips to excel in JEE Advanced examination...",
    likes: 245,
    comments: 45,
  },
  {
    id: 2,
    title: "NEET 2024: Important Topics and Preparation Strategy",
    author: "Dr. Priya Singh",
    authorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
    date: "Mar 14, 2024",
    excerpt:
      "A detailed analysis of important topics and preparation strategy for NEET 2024...",
    likes: 189,
    comments: 32,
  },
  {
    id: 3,
    title: "Top 10 Study Hacks for Competitive Exams",
    author: "Prof. Anita Desai",
    authorImage:
      "https://images.unsplash.com/photo-1594824476968-2b17e3b8f2de?auto=format&fit=crop&q=80&w=300&h=300",
    date: "Mar 13, 2024",
    excerpt:
      "Discover the most effective study hacks to maximize your exam performance...",
    likes: 320,
    comments: 50,
  },
];

export default FeaturedArticles;
