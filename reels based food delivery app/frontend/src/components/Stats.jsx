import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionContext } from "../store/ReactStore";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import PausedVideoComponent from "./PausedVideoComponent";

const Stats = () => {
  const navigation = useNavigate();
  const { setState } = useContext(sessionContext);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState([]);
  const [Resturant, setResturant] = useState();
  const [Delete, setDelete] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 100);
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/get-session", {
          credentials: "include",
        })
      ).json();
      let resturantResponse = { success: false };
      if (res.state) {
        resturantResponse = await (
          await fetch("http://localhost:3000/post/get-resturant-post", {
            method: "post",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: res.state.email }),
          })
        ).json();
      }

      if (
        !res.state ||
        (!resturantResponse.success &&
          resturantResponse.messages[0] ==
            "please login for uploading content") ||
        !resturantResponse.success
      ) {
        setState("");
        navigation("/auth/login");
      } else if (res.state.role !== "admin") {
        navigation("/");
      }
      if (!resturantResponse.success) {
        setError(resturantResponse.messages);
      }

      setResturant(resturantResponse.resturant);

      clearTimeout(timeout);
      setLoading(false);
    })();
  }, [Delete]);
  if (Error?.length !== 0) {
    return <ErrorComponent Error={Error} />;
  }
  if (Loading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-wrap w-full transition-all duration-500 overflow-x-hidden justify-center">
      {Resturant && Resturant?.posts.length !== 0 ? (
        Resturant.posts.map((item, idx) => {
          return (
            <PausedVideoComponent
              item={item}
              idx={idx}
              key={idx}
              Delete={Delete}
              setDelete={setDelete}
              email={Resturant.email}
            />
          );
        })
      ) : (
        <div>No posts to show here</div>
      )}
    </div>
  );
};

export default Stats;
