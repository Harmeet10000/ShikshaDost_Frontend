import { fetchArticleDetails } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import SkeletonLoader from "@/components/loader/SkeletonLoader";

const ActionOnArticles = React.lazy(() =>
  import("@/features/ActionOnArticle/components/ActionOnArticles")
);

const CommentsSection = React.lazy(() => import("./CommentsSection"));

const RichTextRenderer = ({ content }) => {
  // Decode HTML entities into actual HTML
  const parser = new DOMParser();
  const decodedContent = parser.parseFromString(content, "text/html").body
    .textContent;

  // Sanitize the decoded HTML
  const sanitizedContent = DOMPurify.sanitize(decodedContent);

  return (
    <div
      className="prose prose-lg max-w-full"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

const SingleArticleOnUser = () => {
  const { slug } = useParams();
  const [articleDetails, setArticleDetails] = useState(null);
  const { data, isLoading, isError, error } = useQuery(
    ["articleDetails", slug],
    () => fetchArticleDetails(slug),
    {
      enabled: !!slug,
      onSuccess: (data) => setArticleDetails(data),
    }
  );

  if (isLoading)
    return <div className="text-center mt-10">Loading article...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col items-center py-10">
      <div className="px-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2">{articleDetails?.title}</h1>
        <p className="text-xl mb-2">{articleDetails?.desc}</p>
        <hr />
        <div className="flex justify-between items-center py-2">
          <p className="text-gray-500 text-sm">
            Published on:{" "}
            {new Date(articleDetails?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <hr />
        <img
          src={articleDetails?.cover_image}
          alt={articleDetails?.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      </div>

      <div className="actions-on-article px-6 max-w-2xl w-full">
        <React.Suspense fallback={<div>Loading actions...</div>}>
          <ActionOnArticles
            articleDetails={articleDetails}
            setArticleDetails={setArticleDetails}
          />
        </React.Suspense>
      </div>

      <div className="comment-section px-6 max-w-2xl w-full">
        <React.Suspense
          fallback={
            <div>
              <SkeletonLoader />
            </div>
          }
        >
          <CommentsSection articleDetails={articleDetails} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default SingleArticleOnUser;
