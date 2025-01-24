import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
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
  console.log(response.data.data.data);
  return response.data.data.data; // Ensure the API response matches your structure
};

// Context provider
export const ArticleProvider = ({ children }) => {
  // Fetch articles using react-query
  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(["articles"], fetchArticles);

  // Context value
  const value = {
    articles,
    isLoading,
    isError,
    refetch,
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
