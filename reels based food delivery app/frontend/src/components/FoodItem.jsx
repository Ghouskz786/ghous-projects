import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const FoodItem = () => {
  const path = useLocation();
  return (
    <div>
      <Header></Header>
      <div className="flex justify-center">
        <div className="flex gap-8  text-white text-[19px] mt-3 mx-auto">
          <Link
            className={`rounded-[10px]  px-3 py-2 font-bold movingTransitionX ${
              path.pathname == "/food-dashboard/food-items/"
                ? "bg-linear-to-r from-purple-600 to-purple-400 "
                : "bg-linear-to-r from-orange-600 to-orange-400"
            }`}
            to="/food-dashboard/food-items/"
          >
            📋 All Items
          </Link>
          <Link
            className={`rounded-[10px]  px-2 py-2 font-bold movingTransitionXRight ${
              path.pathname == "/food-dashboard/create-food-items/"
                ? "bg-linear-to-r from-purple-600 to-purple-400"
                : "bg-linear-to-r from-orange-600 to-orange-400"
            }`}
            to="/food-dashboard/create-food-items/"
          >
            ➕ Create Items
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default FoodItem;
