import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GiConsoleController } from "react-icons/gi";
const Header = ({
  IntroInView,
  handleScrollAboutme,
  handleScrollContactMe,
  handleScrollHome,
  handleScrollServices,
  handleScrollProjects,
}) => {
  const [MenueVisible, setMenueVisible] = useState("");
  const showMenue = () => {
    setMenueVisible(
      MenueVisible === "" || MenueVisible === "hidden" ? "show" : "hidden",
    );
    console.log(MenueVisible);
  };
  return (
    <div
      className={` px-2.5 fixed z-20 py-3 top-0 w-full bg-white flex justify-between bg-linear-to-b from-pink-50 via-white to-white ${!IntroInView && "shadow-2xs"}`}
    >
      <Link
        to={"/"}
        className="text-4xl font-bold font-sans sm:ml-3.5  relative "
      >
        GHOUS<span className="font-extrabold text-red-500 ">.</span>
      </Link>
      <div
        className={`flex gap-6 px-15 justify-between max-sm:hidden  mx-auto text-[16px]  py-2.5 ${IntroInView && "rounded-2xl shadow-2xl"} `}
      >
        <button
          onClick={handleScrollHome}
          className="hover:scale-105 duration-300 cursor-pointer hover:bg-slate-200 px-3.5 py-1 rounded-[5px]"
        >
          Home
        </button>
        <button
          onClick={handleScrollContactMe}
          className="hover:scale-105 duration-300 cursor-pointer hover:bg-slate-200 px-3.5 py-1 rounded-[5px]"
        >
          Contact me
        </button>
        <button
          onClick={handleScrollAboutme}
          className="hover:scale-105 duration-300 cursor-pointer hover:bg-slate-200 px-3.5 py-1 rounded-[5px]"
        >
          About me
        </button>
        <button
          onClick={handleScrollServices}
          className="hover:scale-105 duration-300 cursor-pointer hover:bg-slate-200 px-3.5 py-1 rounded-[5px]"
        >
          My services
        </button>
        <button
          onClick={handleScrollProjects}
          className="hover:scale-105 duration-300 cursor-pointer hover:bg-slate-200 px-3.5 py-1 rounded-[5px]"
        >
          My projects
        </button>
      </div>
      <div
        className={`sm:hidden w-[50vw] bg-gray-100 flex flex-col h-full fixed right-0 top-0 gap-7 py-7 ${MenueVisible === "show" ? "movingTransitionXRight" : ""} ${MenueVisible === "hidden" ? "disappearTransitionXRight" : ""} ${MenueVisible === "" ? "hidden" : ""}`}
      >
        <button className="absolute top-2 left-2" onClick={showMenue}>
          →
        </button>

        <button
          onClick={handleScrollHome}
          className="hover:scale-105 duration-300 cursor-pointer"
        >
          Home
        </button>

        <button
          onClick={handleScrollContactMe}
          className="hover:scale-105 duration-300 cursor-pointer"
        >
          Contact me
        </button>
        <button
          onClick={handleScrollAboutme}
          className="hover:scale-105 duration-300 cursor-pointer"
        >
          About me
        </button>
        <button
          onClick={handleScrollServices}
          className="hover:scale-105 duration-300 cursor-pointer"
        >
          My services
        </button>
        <button
          onClick={handleScrollProjects}
          className="hover:scale-105 duration-300 cursor-pointer"
        >
          My projects
        </button>
      </div>
      <button
        onClick={showMenue}
        className={`sm:hidden ${MenueVisible === "show" && "hidden"}`}
      >
        <img src="/menue-icon.svg" className="w-[15vw]" alt="menue icon" />
      </button>
    </div>
  );
};

export default Header;
