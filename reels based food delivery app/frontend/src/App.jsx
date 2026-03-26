import React from "react";
import Header from "./components/Header";
import ErrorComponent from "./components/ErrorComponent";
import { useState, useEffect } from "react";
import VideoComponent from "./components/VideoComponent";
import CheckIsScrolling from "./components/CheckIsScrolling";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useRef } from "react";
import Footer from "./components/Footer";
function App() {
  const [Content, setContent] = useState([]);
  const [Error, setError] = useState([]);
  const [LoadContent, setLoadContent] = useState(0);
  const [IsScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
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
        <div>
          <div
            className={`overflow-hidden   ${location.pathname.split("/")[location.pathname.split("/").length - 1] && "blur-xs"}`}
          >
            <Header></Header>
            <div className="flex gap-8  items-center justify-center">
              <div className="flex relative  flex-wrap w-[80vw] items-center justify-center gap-5 h-[80vh] mt-[5vh] overflow-auto scrollContainer snap-y">
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
          <Outlet />
        </div>
      );
    }
  } else {
    return (
      <div>
        <div
          className={`${location.pathname.split("/")[location.pathname.split("/").length - 1] && "blur-xs"} `}
        >
          <CheckIsScrolling setIsScrolling={setIsScrolling} />
        </div>
        <Outlet />
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
