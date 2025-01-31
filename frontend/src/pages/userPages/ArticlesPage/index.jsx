import React, { useEffect } from "react";
import ArticlePageBanner from "./ArticlePageBanner";
import CircleLoader from "@/components/loader/CircleLoader";
import ArticlesGrid from "./ArticlesGrid";
import { fetchArticles } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const ArticlesPage = () => {
  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const cachedArticles = localStorage.getItem("articles");
      if (cachedArticles) {
        return JSON.parse(cachedArticles);
      }

      const fetchedArticles = await fetchArticles();
      localStorage.setItem("articles", JSON.stringify(fetchedArticles));
      return fetchedArticles;
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
    <section className="articles-page">
      <div className="container mx-auto  py-5">
        <ArticlePageBanner />
        <ArticlesGrid articles={articles} />
      </div>
    </section>
  );
};

export default ArticlesPage;
