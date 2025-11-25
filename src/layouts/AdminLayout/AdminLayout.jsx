import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

const AdminLayout = () => {
  const Gap = () => <div className="min-h-24"></div>;
  return (
    <div>
      <Navbar />
      <Gap />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
