import React from "react";
import Header from "./Header";

const CheckIsScrolling = ({ setIsScrolling }) => {
  const handleScrolling = () => {
    setIsScrolling(true);
  };
  return (
    <div>
      <Header />
      <div className="flex  flex-col  items-center justify-center   w-full h-[80vh] mx-auto  gap-3.5">
        <h1 className="text-5xl  hover:transition-transform hover:-translate-y-1 hover:duration-500 max-sm:text-3xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent duration-500 movingTransitionY">
          {" "}
          Delicious Food Awaits
        </h1>
        <div className="text-2xl mt-3 movingTransitionX w-[50%] max-sm:w-[80%] text-slate-600 text-center">
          Discover amazing food reels, Order your favorites, and enjoy the
          culinary experience you have been craving
        </div>
        <button
          onClick={handleScrolling}
          className="cursor-pointer rounded-[10px] hover:transition-all hover:scale-105  hover:duration-500 text-[16px] mt-6  text-white font-bold bg-linear-to-r from-purple-500 via-purple-600 to-purple-700  px-8 py-2 movingTransitionYDown"
        >
          Start Scrolling
        </button>
        <div className="mt-10 flex gap-2.5">
          <div className="flex flex-col movingTransitionX items-center gap-2 p-2.5 rounded-[10px] shadow-2xl hover:transition-all hover:scale-105 duration-500">
            <div className="text-3xl">🎬</div>
            <div className="font-bold text-slate-600 ">Watch Reels</div>
          </div>
          <div className="flex flex-col movingTransitionXRight hover:transition-all hover:scale-105 duration-500 items-center gap-2 p-2.5 rounded-[10px] shadow-2xl">
            <div className="text-3xl">🛒</div>
            <div className="font-bold text-slate-600">Easy Ordering</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIsScrolling;
