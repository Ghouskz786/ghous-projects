import React, { useState, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const ServicesComponent = () => {
  const [ref, InView] = useInView({ threshold: 0.1 });
  const [CurrentInView, setCurrentInView] = useState(false);
  useEffect(() => {
    if (InView) {
      setCurrentInView(true);
    } else {
      setCurrentInView(false);
    }
  }, [InView]);

  return (
    <div
      ref={ref}
      className="flex justify-center flex-col items-center my-25 gap-5"
    >
      <div
        className={`transition-all duration-300 delay-75 ease-in ${CurrentInView ? "translate-y-0" : "-translate-y-6"}`}
      >
        What I offer
      </div>
      <div
        className={`transition-all duration-300 ease-in ${CurrentInView ? "translate-y-0" : "-translate-y-6"} text-4xl font-bold`}
      >
        My Services
      </div>
      <div
        className={`w-[34vw] max-sm:w-[80vw]  text-center transition-opacity duration-300 ${CurrentInView ? "opacity-100" : "opacity-0"}`}
      >
        I am a mern stack developer from Karachi, Pakistan with experience in
        building projects.
      </div>
      <div
        className={`flex max-sm:flex-col gap-5 mt-4 transition-opacity delay-700 duration-300 ${CurrentInView ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-[30vw] hover:scale-105 duration-300 max-sm:w-[90vw] flex flex-col gap-3 rounded-[15px] text-slate-600 hover:bg-gray-100 p-6 border border-slate-300">
          <div className="p-2 bg-pink-400 rounded-[5px] w-fit">
            <FiGlobe size={24} color="white" />
          </div>
          <div className="font-bold">Web design</div>
          <div className="w-[90%]">
            Building unique, tailor-made solutions from the ground up that offer
            a competitive edge over generic templates
          </div>
        </div>
        <div className="w-[30vw] hover:scale-105 duration-300 max-sm:w-[90vw] flex flex-col gap-3 rounded-[15px] text-slate-600 hover:bg-gray-100 p-6 border border-slate-300">
          <div className="p-2 bg-pink-400 rounded-[5px] w-fit">
            <FaRegImage size={24} color="white" />
          </div>
          <div className="font-bold">UI/UX design</div>
          <div className="w-[90%]">
            Designing intuitive interfaces that adapt flawlessly to any screen
            size, improving user engagement and trust.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
