import React from "react";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { PiHandbagSimple } from "react-icons/pi";
const AfterIntroduction = () => {
  const [ApplyTransition, setApplyTransition] = useState(false);
  const [ref, InView] = useInView({ threshold: 0.1 });
  useEffect(() => {
    if (InView) {
     
      setApplyTransition(true);
    } else {
      setApplyTransition(false);
    }
  }, [InView]);
  return (
    <div
      ref={ref}
      className="flex max-sm:flex-col gap-20 max-sm:items-center justify-end mt-20"
    >
      <img
        src="/ghous-image.png"
        alt="user image"
        className={`sm:h-[40vh] self-center max-sm:w-[50vw] sm:mt-20 max-sm:hidden rounded-[10px] mr-6 ${ApplyTransition && "imageTransition"}`}
      />
      <div className="w-fit flex flex-col items-start gap-6">
        <div className="flex flex-col items-center gap-3 sm:ml-20  max-sm:self-center">
          <span
            className={` ${ApplyTransition ? "movingTransitionY" : "opacity-0"}`}
          >
            Introduction
          </span>
          <span
            className={`text-3xl font-bold ${ApplyTransition ? "movingTransitionY" : "opacity-0"}`}
          >
            About Me
          </span>
        </div>
        <img
          src="/ghous-image.png"
          alt="user image"
          className={`sm:h-[32vh] max-sm:w-[50vw] max-sm:mt-15 max-sm:self-center  sm:hidden rounded-[10px] ${ApplyTransition && "imageTransition"}`}
        />
        <div className="w-[60vw] max-sm:w-[90vw] mt-13 max-sm:ml-7 text-balance">
          Hi, I'm <span className="text-blue-500">Muhammad Ghous</span> a
          passionate <span className="font-bold">MERN Stack Developer.</span> I
          specialize in building modern, responsive, and high-performance
          websites using{" "}
          <span className="font-bold">
            MongoDB, Express.js, React.js, Next.js, MySql and Node.js
          </span>{" "}
          . I focus on creating full-stack applications that are fast, scalable,
          and user-friendly.
        </div>
        <div>
          <div className="flex max-sm:flex-col  gap-4 max-sm:w-full items-center justify-center">
            <div className="border border-slate-400 max-sm:mt-3.5 max-sm:mx-6 hover:scale-105 hover:bg-slate-100 duration-300 rounded-[12px] flex flex-col px-6 py-4 w-[17vw] max-sm:w-[80vw]">
              <div className="flex flex-col items-start  self-start ">
                <FaCode color="rgba(120,120,120,1)" size={35} />
                <div className="text-[rgba(120,120,120,1)] font-bold text-2xl mt-3">
                  Languages
                </div>
              </div>
              <div className="w-[80%] sm:pb-6 mt-5 text-[rgba(130,130,130,1)]">
                Html, Css, Javascript, React.js, Next.js
              </div>
            </div>
            <div className="border border-slate-400 max-sm:mt-3.5 hover:scale-105 hover:bg-slate-100 duration-300 rounded-[12px] flex flex-col px-6 py-4 w-[17vw] max-sm:w-[80vw]">
              <div className="flex flex-col items-start self-start ">
                <GiGraduateCap color="rgba(120,120,120,1)" size={35} />
                <div className="text-[rgba(120,120,120,1)] font-bold text-2xl mt-3">
                  Education
                </div>
              </div>
              <div className="w-[100%] mt-5 text-[rgba(130,130,130,1)]">
                Pursuing BSSE from Sindh Madressatul Islam University
              </div>
            </div>
            <div className="border border-slate-400 max-sm:mt-3.5 hover:scale-105 hover:bg-slate-100 duration-300 rounded-[12px] flex flex-col px-6 py-4 w-[17vw] max-sm:w-[80vw]">
              <div className="flex flex-col items-start self-start ">
                <PiHandbagSimple color="rgba(120,120,120,1)" size={35} />
                <div className="text-[rgba(120,120,120,1)] font-bold text-2xl mt-3">
                  Project
                </div>
              </div>
              <div className="w-[60%] mt-5 text-[rgba(130,130,130,1)]">
                Built an amazing Food delivery app
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col max-sm:ml-7">
          <div
            className={`transition-all  duration-300 ease-in delay-75  ${ApplyTransition ? " translate-y-0" : "translate-y-7"}`}
          >
            Tools I use
          </div>
          <div
            className={`mt-5 flex gap-3  ${ApplyTransition ? "visibilityTransition" : "opacity-0"}`}
          >
            <div className="w-[3vw] max-sm:w-[10vw] p-2 border border-slate-400 rounded-[5px] hover:scale-105 duration-300 cursor-pointer">
              <img src="/vscode.png" alt="vs code" />
            </div>
            <div className="w-[3vw] max-sm:w-[10vw] p-2 border border-slate-400 rounded-[5px] hover:scale-105 duration-300 cursor-pointer">
              <img src="/mongodb-logo-removebg-preview.png" alt="vs code" />
            </div>
            <div className="w-[3vw] max-sm:w-[10vw] p-2 border border-slate-400 rounded-[5px] hover:scale-105 duration-300 cursor-pointer">
              <img src="/github-logo.png" alt="vs code" />
            </div>
            <div className="w-[3vw] max-sm:w-[10vw] pt-2 px-0.5 py-0.5 border border-slate-400 rounded-[5px] hover:scale-105 duration-300 cursor-pointer">
              <img src="/mysql-logo.png" alt="vs code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterIntroduction;
