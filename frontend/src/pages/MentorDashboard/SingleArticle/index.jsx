import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchArticleDetails } from "@/services/api";
import DOMPurify from "dompurify";

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

const SingleArticle = () => {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ["articleDetails", slug],
    () => fetchArticleDetails(slug),
    {
      enabled: !!slug, // Only fetch when `slug` exists
    }
  );

  if (isLoading) {
    return <div className="text-center mt-10">Loading article...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error fetching article: {error.response?.data?.message || error.message}
      </div>
    );
  }

  return (
    <div className="flex justify-center  ">
      <div className=" p-6 max-w-2xl w-full ">
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          Published on:{" "}
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <img
          src={data.cover_image}
          alt={data.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <RichTextRenderer content={data.content}/>
      </div>
    </div>
  );
};

export default SingleArticle;
