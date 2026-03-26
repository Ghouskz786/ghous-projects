import React from "react";
import loginSchema from "../../Schema/LoginSchema";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { useEffect } from "react";
import { useContext } from "react";
import { sessionContext } from "../store/ReactStore";
import Header from "./Header";
import Footer from "./Footer";
const Login = () => {
  const { setState } = useContext(sessionContext);
  const [Error, setError] = useState([]);
  const navigation = useNavigate();
  const [Loading, setLoading] = useState(false);
  const handleDataChange = () => {
    setError([]);
  };
  const handleLoginAction = async (e) => {
    try {
      loginSchema.parse({
        userEmail: e.get("userEmail"),
        password: e.get("password"),
      });
    } catch (error) {
      const errorArray = JSON.parse(error).map((item) => {
        return item.message;
      });
      setError(errorArray);
    }
    if (Error.length === 0) {
      try {
        const res = await (
          await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              email: e.get("userEmail"),
              password: e.get("password"),
            }),
          })
        ).json();

        if (!res.success) {
          if (res.messages[0] === "user isn't verified") {
            navigation("/auth/verification");
          } else {
            setError(res.messages);
          }
        } else if (res.success && res.state.isVerified) {
          setState(res.state);
          navigation("/");
        }
      } catch (err) {
        setError(["an unexpected error occured reload"]);
      }
    }
    setLoading(false);
  };
  const handleBtnLooks = (e) => {
    setLoading(true);
  };
  const handleClearError = () => {
    setError([]);
  };
  if (Error.length !== 0 && Error[0] === "an unexpected error occured reload") {
    return <ErrorComponent Error={Error} />;
  }
  return (
    <div className="w-full">
      <Header></Header>
      <form
        action={handleLoginAction}
        onSubmit={handleBtnLooks}
        className="flex flex-col items-center justify-center border-4 border-white rounded-[20px] border-t-slate-700 shadow-2xl p-9 mt-[70px] max-sm:mt-[150px]  mx-auto sm:max-w-[40vw] h-[50vh] max-sm:h-[40vh] gap-3 my-6 max-sm:w-[90vw]"
      >
        <div className="text-3xl my-3.5 text-center font-bold bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent movingTransitionY">
          Enter To Eat Delicious Food 🍽️
        </div>
        <input
          type="text"
          name="userEmail"
          className="border movingTransitionX border-slate-500 rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
          placeholder="Enter your email here"
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="password"
          className="border movingTransitionXRight border-slate-500 rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
          placeholder="Enter your password here"
        />
        <Link
          to="/auth/signup"
          className="self-start text-[13px] my-2 sm:ml-15  text-orange-500 "
        >
          Create account
        </Link>
        <button
          type="submit"
          disabled={Loading}
          onClick={handleClearError}
          className={`border  text-white rounded  px-5 py-1 movingTransitionYDown hover:scale-105 transition-all duration-300 ${Loading ? "bg-linear-to-r from-orange-200 to-orange-400" : "bg-linear-to-r from-orange-400 to-orange-600"} cursor-pointer w-[10vw] max-sm:w-[20vw] flex justify-center`}
        >
          {Loading ? (
            <div className="loader w-[25px] h-[25px] border-2 rounded-[50%] border-white border-l-orange-500 "></div>
          ) : (
            "submit"
          )}
        </button>
      </form>
      {Error && <ErrorComponent Error={Error}></ErrorComponent>}
      <Footer></Footer>
    </div>
  );
};

export default Login;
