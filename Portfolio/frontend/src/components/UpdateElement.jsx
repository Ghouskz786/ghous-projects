import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
const UpdateElement = () => {
  const [Loading, setLoading] = useState(false);
  const [Errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleGet = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/auth/verify-token", {
        method: "post",
        body: JSON.stringify({ otp: e.get("otp") }),
        credentials: "include",
        headers: { "content-type": "application/json" },
      })
    ).json();
    if (!res.success) {
      setErrors(res.messages);
    } else {
      navigate("/update-portfolio/add-project");
    }
  };
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/auth/verify", {
          method: "post",
          credentials: "include",
        })
      ).json();
      if (!res.success) {
        navigate("/");
      }
      setLoading(false);
    })();
  }, []);
  if (Loading) {
    return <div className="mx-auto my-[40vh] text-center">Loading...</div>;
  } else {
    return (
      <div>
        <Header></Header>
        <div className="mt-35 flex flex-col items-center">
          <div className="font-bold text-center">
            Welcome Update Your Portfolio Here
          </div>
          <form
            action={handleGet}
            className="flex flex-col mt-7 items-center gap-3.5"
          >
            <input
              type="text"
              name="otp"
              placeholder="Enter the otp"
              className="sm:w-[35vw] max-sm:w-[80vw] border outline-0 border-white rounded-[10px] px-2.5 py-1.5  border-t-slate-500 shadow-2xl"
            />
            <div className="text-[12px]">
              Enter the Otp here that we have sent you on email
            </div>
            <button
              type="submit"
              className="bg-green-400 cursor-pointer hover:scale-105 transition-all duration-300 text-white font-bold px-6 py-1.5 w-fit rounded-[10px]"
            >
              Verify
            </button>
          </form>
          <div>
            {Errors.map((item, idx) => {
              return (
                <div className="text-red-400" key={idx}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default UpdateElement;
