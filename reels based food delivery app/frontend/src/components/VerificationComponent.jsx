import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import Header from "./Header";
import Footer from "./Footer";

const VerificationComponent = () => {
  const [Error, setError] = useState("");
  const [Login, setLogin] = useState(false);
  const [CodeSent, setCodeSent] = useState(false);
  const [Message, setMessage] = useState(false);
  const navigation = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/get-session-without-login", {
          credentials: "include",
          method: "get",
        })
      ).json();
      if (!res.success) {
        navigation("/auth/login");
      }
    })();
  }, []);

  const handleVerificationForm = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/auth/verification", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: e.get("otp") }),
      })
    ).json();
    if (!res.success) {
      if (res.messages[0] !== "Enter the right otp") {
        setLogin(true);
      }
      setError(res.messages);
    } else {
      setMessage(true);
    }
  };
  const handleResendOtp = async () => {
    setCodeSent(true);
    const res = await (
      await fetch("http://localhost:3000/auth/resend-otp", {
        method: "POST",
        credentials: "include",
      })
    ).json();

    if (
      !res.success &&
      res.messages[0] === "no session exist please login again"
    ) {
      setLogin(true);
    }
    setError(res.messages);
  };
  return (
    <div>
      <Header></Header>
      <div className="flex mx-auto  h-[60vh] flex-col mt-12  items-center shadow-2xl  max-sm:w-[90vw] sm:w-[35vw] rounded-2xl border-4 border-white border-t-black ">
        <div className="bg-clip-text text-transparent text-3xl mt-6 font-bold bg-linear-to-r from-purple-500 via-pink-500 to-orange-500">
          Enter Verification Code
        </div>
        <form
          action={handleVerificationForm}
          className="flex flex-col w-full items-center mt-6 gap-3"
        >
          <input
            type="text"
            placeholder="Enter the otp here"
            name="otp"
            className="border border-slate-500 w-[70%] py-1 px-2.5"
          />
          <button
            type="submit"
            className="rounded-[5px] px-3.5 py-1.5 mt-2.5 font-bold text-white bg-linear-to-r from-purple-500 to-pink-500"
          >
            submit
          </button>
        </form>

        {Message && Error && <ErrorComponent Error={Error}></ErrorComponent>}
        {Login && <Link to="/auth/login">Go to login</Link>}
        {Message && (
          <div>
            {" "}
            <div className="text-green-500">
              Your account have been verified now you can login{" "}
            </div>{" "}
            <Link to="/auth/login">Login</Link>
          </div>
        )}
        {!Message && (
          <button
            disabled={CodeSent}
            onClick={handleResendOtp}
            className="rounded-[5px] px-3.5 py-1.5 mt-2.5 font-bold text-white bg-linear-to-r from-purple-500 to-pink-500 "
          >
            Resend Code
          </button>
        )}
        {!Login && (
          <div className="text-[10px] mt-5">
            We have sent you an otp on your given email please enter it here
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default VerificationComponent;
