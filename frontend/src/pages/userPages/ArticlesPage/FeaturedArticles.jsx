import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useArticles } from "@/context/ArticleContext";

import React from "react";
import { Link } from "react-router-dom";

const FeaturedArticles = () => {
  const { articles } = useArticles();
  console.log(articles);
  return (
    <div className="latest-articles-list flex flex-col gap-y-5">
      {articles?.map((article, i) => (
        <Link
          to={`/articles/${article.slug}`}
          key={article._id}
          className={`${
            i === articles.length - 1
              ? "border-none"
              : "border-b-2 border-gray-300"
          } py-3`}
        >
          <div className="flex flex-col sm:flex-row-reverse xl:flex-col gap-3">
            <div className="w-full sm:w-2/6 xl:w-full flex  justify-center items-center">
              <img
                className="w-full  h-48 object-cover rounded-xl"
                src={article.cover_image}
                alt={article.title}
              />
            </div>
            <div className="xl:w-full w-full sm:w-4/6 flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold">{article.title}</h1>
                <p className="text-xl">{article.desc}</p>
              </div>

              <div>
                <div className="flex items-center gap-x-3">
                  <Avatar>
                    <AvatarImage
                      src={article.author.profile_imageURL}
                      alt={article.author.name}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <h1>{article.author.name}</h1>
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedArticles;
