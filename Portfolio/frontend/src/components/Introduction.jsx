import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Introduction = ({ entry, handleMoveToContact }) => {
  const [ApplyTransition, setApplyTransition] = useState(false);
  const [ref, InView] = useInView({ threshold: 0.1 });
  const [Darked, setDarked] = useState(false);
  useEffect(() => {
    if (InView) {
      setApplyTransition(true);
    } else {
      setApplyTransition(false);
    }
  }, [InView]);
  const handleDark = () => {
    setDarked(true);
  };
  const handleDarkfalse = () => {
    setDarked(false);
  };
  const handleDownloadResume = async () => {
    const res = await fetch(
      "https://ghous-projects.vercel.app/resume/download-resume",
      {
        method: "post",
        credentials: "include",
      },
    );
    const element = window.document.createElement("a");

    const resObj = await res.blob();
    element.href = URL.createObjectURL(resObj);
    element.download = "ghous resume.pdf";
    console.log(element);
    window.document.body.appendChild(element);
    element.click();
    URL.revokeObjectURL(resObj);
    window.document.body.removeChild(element);
  };
  return (
    <div ref={ref} className="flex flex-col  gap-5 items-center">
      <img
        src="/ghous-image.png"
        alt="Image"
        className={`rounded-[50%]  bg-center  w-[80px] ${ApplyTransition ? "imageTransition" : "opacity-0"} bg-contain `}
      />
      <div className={`text-2xl  `}>Hi! I'm Muhammad Ghous 👋</div>
      <div
        className={`sm:w-[40vw]  max-sm:w-[80vw] font-bold text-center text-2xl`}
      >
        MERN Stack developer based in Pakistan.
      </div>
      <div className={`sm:w-[40vw] max-sm:w-[80vw] text-center `}>
        I'm a MERN stack developer in Karachi with experience in projects.
      </div>
      <div className="flex gap-4 max-sm:flex-col">
        <button
          className={`${!Darked && "bg-black text-white"} ${ApplyTransition ? "movingTransitionX" : "opacity-0"} cursor-pointer rounded-[999px] px-6 py-1 text-[16px] border border-slate-500`}
          onClick={handleDarkfalse}
          onClickCapture={handleMoveToContact}
        >
          Contact me →
        </button>
        <button
          className={`${Darked && "bg-black text-white"} ${ApplyTransition ? "movingTransitionXRight" : "opacity-0"} rounded-[999px] px-6 py-1 text-[16px] border border-slate-500 cursor-pointer`}
          onClick={handleDark}
          onClickCapture={handleDownloadResume}
        >
          My resume ↧
        </button>
      </div>
    </div>
  );
};

export default Introduction;
