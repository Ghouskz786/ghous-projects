import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { redirect } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const path = useLocation();
  const navigation = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/get-session", {
          method: "get",
          credentials: "include",
        })
      ).json();
      if (!res.state) {
        navigation("/auth/login");
      }
    })();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Header></Header>
      <div className="flex items-center overflow-x-hidden  flex-col">
        <div className="flex gap-8 text-[19px]  text-white mt-3">
          <Link
            className={`rounded-[10px]  px-2 py-2 movingTransitionX  ${
              path.pathname == "/dashboard/posts"
                ? "bg-linear-to-r from-purple-600 to-purple-400"
                : "bg-linear-to-r from-orange-600 to-orange-400"
            }`}
            to="/dashboard/posts"
          >
            📋 All Posts
          </Link>
          <Link
            className={`rounded-[10px]  px-2 py-2 movingTransitionXRight ${
              path.pathname == "/dashboard/create-post"
                ? "bg-linear-to-r from-purple-600 to-purple-400"
                : "bg-linear-to-r from-orange-600 to-orange-400"
            }`}
            to="/dashboard/create-post"
          >
            ➕ Create Post
          </Link>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
