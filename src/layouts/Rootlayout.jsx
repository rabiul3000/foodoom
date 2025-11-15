import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const Rootlayout = () => {
  const Gap = () => <div className="min-h-24"></div>;
  return (
    <div>
      <Navbar />
      <Gap />
      <Outlet />
    </div>
  );
};

export default Rootlayout;
