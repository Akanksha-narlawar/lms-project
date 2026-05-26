import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token → send back to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists → allow access
  return children;
};

export default ProtectedRoute;