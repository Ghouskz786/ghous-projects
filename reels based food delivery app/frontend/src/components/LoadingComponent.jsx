import React from "react";

const LoadingComponent = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <div className="w-[150px] h-[150px] rounded-[50%] border-3 border-white border-b-black loader"></div>
      <div>loading...</div>
    </div>
  );
};

export default LoadingComponent;
