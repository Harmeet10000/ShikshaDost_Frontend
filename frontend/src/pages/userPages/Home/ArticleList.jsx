import React from "react";
import { ThumbsUp, MessageCircle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import article_thumbnail from "../../../assets/article.jpg";
import { useArticles } from "@/context/ArticleContext";
import { Link } from "react-router-dom";
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const hoverEffect = {
  scale: 1.05,
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
};

const ArticleList = () => {
  const { articles, isLoading, isError } = useArticles();

  if(isLoading){
     return (<div> loading ...</div>)
  }

  if(isError){
    return (<div> error ...</div>)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles?.map((article) => (
        <motion.div
          key={article._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden p-3 space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          whileHover={hoverEffect}
        >
         
          <Link to={`/articles/${article.slug}`} >
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
          </Link>

          <div className=" flex flex-col justify-between">
           
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">
              {article.desc}{" "}
             
            </p>

          
            <div className="flex items-center mt-4">
              <img
                src={article.author.profile_imageURL}
                alt={article.author.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{article.author.name}</h3>
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {/* <p className="text-sm text-gray-500">{article.date}</p> */}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ArticleList;
