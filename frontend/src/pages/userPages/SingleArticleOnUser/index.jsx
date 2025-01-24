import { fetchArticleDetails } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { BiLike, BiComment, BiShare } from "react-icons/bi";

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
  console.log(slug);

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
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-xl mb-2">{data.desc}</p>
        <hr />
        <div className="flex justify-between items-center py-2">
          <p className="text-gray-500 text-sm ">
            Published on:{" "}
            {new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="flex gap-x-3 items-center">
            <div className="flex gap-x-2 items-center">
              <span>
                <BiLike />
              </span>{" "}
              400
            </div>
            <div className="flex gap-x-2 items-center">
              <span>
                <BiComment />
              </span>{" "}
              50
            </div>
            <div className="flex gap-x-2 items-center">
              <span>
                <BiShare />
              </span>{" "}
              100
            </div>
          </div>
        </div>
        <hr />
        <div className="py-3">
          <img
            src={data.cover_image}
            alt={data.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        </div>

        <RichTextRenderer content={data.content} />
      </div>
    </div>
  );
};

export default SingleArticleOnUser;
