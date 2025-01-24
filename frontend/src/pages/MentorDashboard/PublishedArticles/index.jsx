import { useAuth } from "@/context/AuthContext";
import { fetchMentorBlogs } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import ShimmerButton from "@/components/ui/shimmer-button";
import { Link } from "react-router-dom";

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

const PublishedArticles = () => {
  const { user } = useAuth();
  const mentorId = user?._id;

  const { data, isLoading, isError, error } = useQuery(
    ["mentorBlogs", mentorId],
    () => fetchMentorBlogs(mentorId),
    {
      staleTime: 300000,
      cacheTime: 600000,
      retry: 2,
    }
  );

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className="bg-red-100 p-4 text-red-700">
        Error fetching blogs: {error.response?.data?.message || error.message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Published Articles</h1>
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((blog) => (
            <article
              key={blog._id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-3"
            >
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p>{blog.desc}</p>
                <div className="flex justify-between items-center py-3">
                  <p className="text-gray-500 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <Link to={`/mentor/published-articles/${blog.slug}`}>
                    <ShimmerButton>Go to article</ShimmerButton>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No blogs found for this mentor.</p>
      )}
    </div>
  );
};

export default PublishedArticles;
