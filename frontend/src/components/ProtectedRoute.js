import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

const ProtectedRoute = ({ roleBasedRoutes }) => {
  const { setMessage } = useFlashMessage();
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isLoggedIn) {
    setMessage("Please log in to access this page.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === "Admin") {
    return roleBasedRoutes.admin;
  }

  if (role === "Student") {
    return roleBasedRoutes.student;
  }

  // If role does not match, redirect to login or another appropriate route
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
