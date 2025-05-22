import React from "react";

const BaseLoading = () => {
  return (
    <div className="w-screen h-screen bg-black/80  fixed inset-0 z-50 top-0 left-0">
      <div className="flex flex-col justify-center items-center rounded-2xl py-5 px-5 bg-neutral w-40 h-40 absolute top-96 left-1/2 -ml-20">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    </div>
  );
};

export default BaseLoading;
