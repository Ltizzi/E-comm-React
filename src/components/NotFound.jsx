import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div
        className="rounded-4xl shadow-lg shadow-secondary border-4 border-primary border-double border-spacing-36 bg-cover bg-center h-4/5 w-5/6 text-center align-middle flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(/img/404.png)`,
        }}
      >
        <h1 className="text-9xl font-extrabold font-serif font-stretch-ultra-condensed text-white text-shadow-lg text-shadow-pink-500">
          404 - Not Found!
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
