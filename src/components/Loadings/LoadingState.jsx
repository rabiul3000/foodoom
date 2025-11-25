import React from "react";

const LoadingState = () => {
  return (
    <div className="w-full flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-bars loading-lg"></span>
      <span className="loading loading-bars loading-lg"></span>
      <span className="loading loading-bars loading-lg"></span>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};

export default LoadingState;
