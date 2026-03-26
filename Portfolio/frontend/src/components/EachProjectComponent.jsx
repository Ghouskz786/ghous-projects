import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const EachProjectComponent = ({ item }) => {
  const divRef = useRef();
  const [ShowMoreButton, setShowMoreButton] = useState(false);
  const [ChangeHeight, setChangeHeight] = useState(false);

  useEffect(() => {
    if (
      divRef.current &&
      divRef.current.scrollHeight > divRef.current.clientHeight
    ) {
      setShowMoreButton(true);
    }
  }, [divRef.current]);

  const handleShowText = () => {
    console.log(ShowMoreButton);
    setShowMoreButton(false);
    setChangeHeight(true);
  };
  return (
    <div
      className={`flex flex-col hover:scale-105 duration-300 rounded-[10px] max-w-[90vw] sm:max-w-[27vw]  gap-3 shadow-2xl `}
    >
      <img
        src={item.projectImg}
        className="bg-cover rounded-tr-[10px]  rounded-tl-[10px]"
        alt="project image"
      />
      <div className="text-center font-bold text-2xl px-2.5">{item.title}</div>
      <div
        ref={divRef}
        className={`text-center px-2.5  h-[11vh] ${ChangeHeight && "h-full"} relative overflow-y-hidden overflow-x-hidden   `}
      >
        {item.description}
        {ShowMoreButton && (
          <button
            onClick={handleShowText}
            className="absolute bottom-0  border  border-slate-200 bg-white text-black px-4 cursor-pointer right-3"
          >
            show more
          </button>
        )}
      </div>
      <Link
        to={item.projectGithub}
        className="bg-blue-500 text-white font-bold w-fit py-1 self-center mb-1.5 px-6 rounded-[10px]"
      >
        Source Code
      </Link>
    </div>
  );
};

export default EachProjectComponent;
