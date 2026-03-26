import React, { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import itemSchema from "../../Schema/ItemsSchema";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { sessionContext } from "../store/ReactStore";
import LoadingComponent from "./LoadingComponent";
import { Outlet } from "react-router-dom";

import FoodItemComponents from "./FoodItemComponents";
const AllFoodItems = () => {
  const [DeleteItem, setDeleteItem] = useState(false);
  const [Errors, setErrors] = useState([]);
  const [Login, setLogin] = useState(false);
  const { setState, State } = useContext(sessionContext);
  const [Loading, setLoading] = useState(false);
  const [Resturant, setResturant] = useState();
  const navigation = useNavigate();

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

      if (!res.state) {
        setState("");
        navigation("/auth/login");
      } else if (res.state.role !== "admin") {
        navigation("/");
      }
      if (res.success) {
        const resturantRes = await (
          await fetch("http://localhost:3000/item/get-item", {
            method: "post",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: res.state.email }),
          })
        ).json();

        if (resturantRes.success) {
          setResturant(resturantRes.resturant);
        } else if (!resturantRes.success) {
          setErrors(resturantRes.messages);
        }
      }

      clearTimeout(timeout);
      setLoading(false);
    })();
  }, [DeleteItem]);
  if (Loading) {
    return <LoadingComponent />;
  }
  if (Errors.length !== 0) {
    <ErrorComponent Error={Errors} />;
  }
  return (
    <div className="overflow-x-hidden">
      <div className="bg-clip-text text-transparent max-sm:w-[80vw] mx-auto my-8 text-center bg-linear-to-r from-purple-500 to-purple-400 font-bold text-3xl movingTransitionXRight">
        🍽️ Your Resturant Items
      </div>
      <div className="flex flex-wrap justify-center mb-8">
        {Resturant &&
          Resturant.items.map((item, idx) => {
            return (
              <FoodItemComponents
                item={item}
                key={idx}
                email={State.email}
                setDeleteItem={setDeleteItem}
                DeleteItem={DeleteItem}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AllFoodItems;
