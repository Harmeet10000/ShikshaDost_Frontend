import { useAuth } from "@/context/AuthContext";
import { fetchMentorBlogs } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DOMPurify from 'dompurify';

const RichTextRenderer = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

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
        <div className="space-y-8">
          {data.map((blog) => (
            <article key={blog.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>
              <RichTextRenderer content={blog.content} />
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