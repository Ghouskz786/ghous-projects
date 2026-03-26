import { createContext } from "react";
export const sessionContext = createContext([]);
import React from "react";
import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const ReactStore = ({ children }) => {
  const [State, setState] = useState("");
  const [Cart, setCart] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setLoading(true);
    }, 500);

    (async () => {
      const res = await (
        await fetch("http://localhost:3000/get-session", {
          credentials: "include",
        })
      ).json();
      if (res.state) {
        setState(res.state);
      }
      clearTimeout(timeOut);
      setLoading(false);
    })();
  }, []);

  if (Loading) {
    return <LoadingComponent />;
  } else {
    return (
      <sessionContext.Provider value={{ State, setState, Cart, setCart }}>
        {children}
      </sessionContext.Provider>
    );
  }
};

export default ReactStore;
