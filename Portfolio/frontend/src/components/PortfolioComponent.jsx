import React from "react";
import EachProjectComponent from "./EachProjectComponent";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const PortfolioComponent = ({ Projects }) => {
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
    <div ref={ref} className={`flex  flex-col items-center mt-17 gap-4`}>
      <div
        className={`flex flex-col gap-4 items-center  ${ApplyTransition ? "movingTransitionX" : "opacity-0"}`}
      >
        <div>My Portfolio</div>
        <div className="text-3xl font-bold">My Latest Project</div>
        <div className="sm:w-[35vw] max-sm:w-[80vw] text-center">
          Welcome to Developer Portfolio showcasing my experties in MERN stack
          development
        </div>
      </div>
      {Projects.length !== 0 ? (
        <div
          className={`flex max-sm:flex-col justify-center transition-opacity duration-700 delay-300 flex-wrap ease-in items-center gap-5 my-8 ${ApplyTransition ? "opacity-100" : "opacity-0"}`}
        >
          {Projects.map((item, idx) => {
            return (
              <EachProjectComponent
                item={item}
                key={idx}
              ></EachProjectComponent>
            );
          })}
        </div>
      ) : (
        <div>No projects to show here</div>
      )}
    </div>
  );
};

export default PortfolioComponent;
