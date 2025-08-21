import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ✅ Check if user is logged in
  const token = localStorage.getItem("token");

  if (!token) {
    // 🚨 If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ If token exists, show the requested page
  return children;
};

export default ProtectedRoute;

