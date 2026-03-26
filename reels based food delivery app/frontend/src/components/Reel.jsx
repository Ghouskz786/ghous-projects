import React from "react";
import Header from "./Header";
import ErrorComponent from "./ErrorComponent";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import VideoComponent from "./VideoComponent";
import CheckIsScrolling from "./CheckIsScrolling";

const Reel = () => {
  const [Content, setContent] = useState([]);
  const [Error, setError] = useState([]);
  const [LoadContent, setLoadContent] = useState(0);
  const [IsScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    if (Content.length === 0 || LoadContent > Content.length - 10) {
      (async () => {
        const res = await (
          await fetch("http://localhost:3000/post/get-post", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              skippingCount: Content.length ? Content.length : 0,
            }),
          })
        ).json();
        if (res.success) {
          setContent([...Content, ...res.result]);
        } else {
          setError(res.messages);
        }
      })();
    }
  }, [LoadContent]);
  if (IsScrolling) {
    if (Error.length !== 0) {
      return <ErrorComponent Error={Error} />;
    } else {
      return (
        <div className="overflow-hidden">
          <Header></Header>
          <div className="flex gap-8 items-center justify-center mx-auto">
            <div className="flex relative flex-wrap w-full items-center justify-center gap-20 h-[90vh] overflow-auto scrollContainer  snap-mandatory snap-y scroll-smooth">
              {Content.length !== 0 &&
                Content.map((item, idx) => {
                  return (
                    <VideoComponent
                      item={item}
                      idx={idx}
                      key={idx}
                      setLoadContent={setLoadContent}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <CheckIsScrolling setIsScrolling={setIsScrolling} />;
  }
};

export default Reel;
