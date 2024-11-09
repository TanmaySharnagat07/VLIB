import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ roleBasedRoutes }) => {
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isLoggedIn) {
    toast.error("Please log in to access this page.", { position: "top-center" });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === "Admin") {
    return roleBasedRoutes.admin;
  }

  if (role === "Student") {
    return roleBasedRoutes.student;
  }

  // If role does not match, show an error and redirect
  toast.error("You do not have permission to access this page.", { position: "top-center" });
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
