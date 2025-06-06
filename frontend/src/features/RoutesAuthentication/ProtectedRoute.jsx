import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ element: Element, roles }) => {
  const { user, loading } = useAuth();
  console.log('protect',user);
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // If user doesn't have required role, redirect to appropriate dashboard
  if (!roles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }else if (user.role === "mentor"){
      return <Navigate to="/mentor/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return Element;
};

export default ProtectedRoute;
