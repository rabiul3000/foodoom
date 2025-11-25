import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const role = user?.role;
  if (role === "admin") {
    return children;
  }
};

export default AdminRoute;
