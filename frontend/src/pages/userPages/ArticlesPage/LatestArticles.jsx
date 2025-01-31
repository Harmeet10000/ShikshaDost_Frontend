import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchLatestArticles } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  const {
    data: latestArticles = [],
    isLoading,
    isError,
    refetch,
    // setData: setArticles, // Allows updating the data directly
  } = useQuery(["latestArticles"], fetchLatestArticles);

  console.log(latestArticles);
  if (isLoading) {
    return <div>...loading</div>;
  }

  if (isError) {
    return <div>...error</div>;
  }
  return (
    <div className="latest-articles-list flex flex-col gap-y-5">
      {latestArticles?.map((article, i) => (
        <Link
          to={`/articles/${article.slug}`}
          key={article._id}
          className={`${
            i === latestArticles.length - 1
              ? "border-none"
              : "border-b-2 border-gray-300"
          } py-3`}
        >
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <div className="w-full sm:w-4/6 flex flex-col justify-between">
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
            <div className="w-full sm:w-2/6 flex justify-center items-center">
              <img
                className="w-full  h-48 object-cover rounded-xl"
                src={article.cover_image}
                alt={article.title}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LatestArticles;
