import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Create the context
const ArticleContext = createContext();
const token = Cookies.get("authToken");

// API call to fetch articles
const fetchArticles = async () => {
  const response = await axios.get(
    "http://localhost:8000/api/v1/blogs/getAllBlogs",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  // console.log(response.data.data.data);
  return response.data.data.data; // Ensure the API response matches your structure
};

// Context provider
export const ArticleProvider = ({ children }) => {
  const queryClient = useQueryClient();
  // Fetch articles using react-query
  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
    setData: setArticles, // Allows updating the data directly
  } = useQuery(["articles"], fetchArticles);

  // Function to update comments for a specific blog
  const updateArticleComments = ({ blogId, newComment }) => {
    // Update the query cache for articles
    queryClient.setQueryData(["articles"], (oldArticles = []) => {
      return oldArticles.map((article) => {
        if (article._id === blogId) {
          return {
            ...article,
            comments: [...(article.comments || []), newComment],
          };
        }
        return article;
      });
    });
  };
  // Context value
  const value = {
    articles,
    isLoading,
    isError,
    refetch,
    updateArticleComments,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};

// Custom hook to use the context
export const useArticles = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw new Error("useArticles must be used within an ArticleProvider");
  }

  return context;
};
