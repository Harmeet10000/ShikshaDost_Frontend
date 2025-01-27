import React from "react";
import ArticlePageBanner from "./ArticlePageBanner";
import CircleLoader from "@/components/loader/CircleLoader";
import ArticlesGrid from "./ArticlesGrid";


const ArticlesPage = () => {
  return (
    <section className="articles-page">
      <div className="container mx-auto  py-5">
        <ArticlePageBanner />
        <ArticlesGrid/>
      </div>
    </section>
  );
};

export default ArticlesPage;
