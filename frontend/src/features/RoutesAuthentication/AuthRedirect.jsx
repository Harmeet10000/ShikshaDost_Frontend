import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthRedirect = ({ element: Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is admin, redirect to admin dashboard
  if (user && user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If no user or not admin, show the requested element
  return Element;
};

export default AuthRedirect