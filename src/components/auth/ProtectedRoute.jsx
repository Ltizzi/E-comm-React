import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { isAuthenticated, children } = props;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
