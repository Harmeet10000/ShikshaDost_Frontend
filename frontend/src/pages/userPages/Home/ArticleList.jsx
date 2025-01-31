import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchArticles, fetchProminentArticles } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ArticleList = () => {
  const {
      data: prominentArticles,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["prominentArticles"],
      queryFn: async () => {
        const cachedArticles = localStorage.getItem("prominent-articles");
        if (cachedArticles) {
          return JSON.parse(cachedArticles);
        }
  
        const fetchedProminentArticles = await fetchProminentArticles();
        localStorage.setItem("prominent-articles", JSON.stringify(fetchedProminentArticles));
        return fetchedProminentArticles;
      },
      staleTime: 1000 * 60 * 10, // Cache for 10 minutes
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
  
    if (isLoading) {
      return <div>...loading</div>;
    }
  
    if (isError) {
      return <div>...error</div>;
    }
  

  return (
    <div className="w-full px-2 sm:px-4 py-2">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {prominentArticles?.map((article) => (
            <CarouselItem
              key={article._id}
              className="pl-1 basis-full sm:basis-1/2 lg:basis-1/2 xl:basis-1/3"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="h-full"
              >
                <div className="bg-white border rounded-lg shadow-lg overflow-hidden p-2 sm:p-3 h-full flex flex-col">
                  <Link 
                    to={`/articles/${article.slug}`}
                    className="block w-full overflow-hidden"
                  >
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md transition-transform hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-col flex-grow mt-3">
                    <h2 className="text-lg sm:text-xl font-semibold line-clamp-2 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base line-clamp-3 mb-4 flex-grow">
                      {article.desc}
                    </p>

                    <div className="flex items-center mt-auto">
                      <img
                        src={article.author.profile_imageURL}
                        alt={article.author.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base truncate">
                          {article.author.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {new Date(article.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden sm:block">
          <CarouselPrevious className="left-0 bg-[#172e59] text-white" />
          <CarouselNext className="right-0 bg-[#172e59] text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default ArticleList;