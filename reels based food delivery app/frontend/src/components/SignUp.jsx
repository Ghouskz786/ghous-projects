import React from "react";
import signUpSchema from "../../Schema/SignUpSchema";
import { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { Link, redirect, useNavigate } from "react-router-dom";
import Header from "./Header";
import foodPartner from "../../Schema/FoodPartner";
import Footer from "./Footer";
const SignUp = () => {
  const [Checked, setChecked] = useState("user");
  const [Error, setError] = useState("");
  const [Login, setLogin] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChangeRole = (e) => {
    setChecked(e.target.value);
  };
  const handleSignUpAction = async (e) => {
    try {
      if (e.get("role") == "user") {
        signUpSchema.parse({
          userName: e.get("userName"),
          email: e.get("email"),
          password: e.get("password"),
          verifyPassword: e.get("verifyPassword"),
          role: e.get("role"),
          contact: e.get("contact"),
        });
        const res = await (
          await fetch("http://localhost:3000/auth/sign-up", {
            credentials: "include",
            method: "POST",
            headers: {
              "content-type": "application/json",
            },

            body: JSON.stringify({
              userName: e.get("userName"),
              email: e.get("email"),
              password: e.get("password"),
              role: e.get("role"),
              contact: e.get("contact"),
            }),
          })
        ).json();
        setLoading(false);
        if (!res.success) {
          setError(res.messages);
          if (res.messages[0] === "user already exist with this email login") {
            setLogin(true);
          }
        } else {
          navigate("/auth/login");
        }
      } else {
        foodPartner.parse({
          userName: e.get("userName"),
          email: e.get("email"),
          password: e.get("password"),
          verifyPassword: e.get("verifyPassword"),
          role: e.get("role"),
          contact: e.get("contact"),
          resturantName: e.get("resturantName"),
        });
        const res = await (
          await fetch("http://localhost:3000/auth/food-partner-signup", {
            method: "post",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              userName: e.get("userName"),
              email: e.get("email"),
              password: e.get("password"),
              contact: e.get("contact"),
              role: e.get("role"),
              resturantName: e.get("resturantName"),
            }),
          })
        ).json();

        setLoading(false);
        if (!res.success) {
          setError(res.messages);
          if (res.messages[0] === "user already exist with this email login") {
            setLogin(true);
          }
        } else {
          navigate("/auth/login");
        }
      }
    } catch (error) {
      setLoading(false);
      const errorArray = [];
      JSON.parse(error).map((item) => {
        errorArray.push(item.message);
      });
      setError(errorArray);
    }
  };
  const handleBtnLooks = (e) => {
    setLoading(true);
  };
  const handleClearError = () => {
    setError([]);
  };
  return (
    <div>
      <Header />
      <form
        action={handleSignUpAction}
        onSubmit={handleBtnLooks}
        className="flex flex-col max-sm:mt-16 border-4 rounded-[20px] border-white items-center justify-center shadow-2xl p-5   mx-auto sm:max-w-[40vw] h-[75vh] max-sm:h-[60vh] border-t-slate-700 gap-3 my-6 max-sm:w-[90vw]"
      >
        <div className="text-3xl my-4 text-center movingTransitionY   font-bold">
          <span className="bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Join Our Delicious Commnunity
          </span>{" "}
          <span>👥</span>
        </div>
        {Checked == "admin" && (
          <input
            type="text"
            placeholder="Enter the resturant name here"
            name="resturantName"
            className="border border-slate-500 movingTransitionX rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
          ></input>
        )}
        <input
          type="text"
          name="userName"
          className="border border-slate-500 movingTransitionXRight rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
          placeholder="Enter the user name here"
        />
        <input
          type="text"
          name="email"
          placeholder="Enter the Email here"
          className="border border-slate-500 movingTransitionX rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
        />
        <input
          type="text"
          name="password"
          className="border border-slate-500 movingTransitionXRight rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
          placeholder="Enter the password here"
        />
        <input
          type="text"
          name="verifyPassword"
          className="border border-slate-500 movingTransitionX rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
          placeholder="Verify the password here"
        />
        <input
          type="text"
          name="contact"
          className="border border-slate-500 movingTransitionXRight rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
          placeholder="Enter contact number here"
        />
        <div className="flex gap-7 ">
          <label htmlFor="userId" className="cursor-pointer movingTransitionX">
            <input
              checked={Checked === "user"}
              type="radio"
              id="userId"
              value="user"
              name="role"
              onChange={handleChangeRole}
            />{" "}
            User 👤
          </label>
          <label
            htmlFor="adminId"
            className="cursor-pointer movingTransitionXRight"
          >
            <input
              checked={Checked === "admin"}
              type="radio"
              id="adminId"
              value="admin"
              name="role"
              onChange={handleChangeRole}
            />{" "}
            Resturant 🍴
          </label>
        </div>
        <div className="self-start text-[13px] sm:ml-17 max-sm:ml-7">
          Already have an account{" "}
          <Link to="/auth/login" className="  text-orange-500">
            login
          </Link>
        </div>
        <button
          type="submit"
          disabled={Loading}
          onClick={handleClearError}
          className={`border rounded px-5 py-1  ${Loading ? "bg-linear-to-r from-orange-200 to-orange-400" : "bg-linear-to-r from-orange-400 to-orange-600"} movingTransitionYDown cursor-pointer w-[10vw] max-sm:w-[30vw] flex text-white justify-center`}
        >
          {Loading ? (
            <div className="loader w-[25px] h-[25px] border-2 rounded-[50%] border-white border-l-orange-500 "></div>
          ) : (
            "sign up"
          )}
        </button>
      </form>
      {Error && <ErrorComponent Error={Error}></ErrorComponent>}
      {Login && <Link to="/auth/login">Go to login</Link>}
      <Footer></Footer>
    </div>
  );
};

export default SignUp;
