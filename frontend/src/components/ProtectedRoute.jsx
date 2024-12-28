import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // Assuming you have AuthContext for user data

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
  const { user } = useAuth(); // Get user data from context

  // Check if the user is authenticated and has the required role
  const isAuthorized = user && roles.includes(user.role);
console.log('isAuthorized',isAuthorized);
  // Return a Route with a check for authorization
  return isAuthorized ? Element : <Navigate to="/register" />;
};

export default ProtectedRoute;
