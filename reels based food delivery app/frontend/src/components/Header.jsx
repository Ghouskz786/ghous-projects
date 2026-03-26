import React, { useEffect, useState } from "react";
import {
  Link,
  resolvePath,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useContext } from "react";
import { sessionContext } from "../store/ReactStore";
import { IoCartOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiFilmReelLight } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { MdOutlineBorderColor } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { IoMdReorder } from "react-icons/io";
const Header = () => {
  const { State, setState, Cart, setCart } = useContext(sessionContext);
  const [SideBar, setSideBar] = useState("");
  const location = useLocation();
  resolvePath(location.pathname + "cart");
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth <= 344 && setSideBar("");
    });
  }, []);

  const navigation = useNavigate();
  const handleSignOut = async () => {
    const res = await (
      await fetch("http://localhost:3000/delete-session", {
        credentials: "include",
      })
    ).json();
    if (res.success) {
      navigation("/auth/login");
      setState("");
      setCart([]);
    }
  };

  const handleSideBar = () => {
    setSideBar(SideBar == "" || SideBar == "hide" ? "show" : "hide");
    console.log(window.innerWidth);
  };

  return (
    <ul className="flex text-2xl items-center  overflow-x-hidden  bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 justify-between w-full text-white py-1 px-3.5">
      <div className="gap-11 max-sm:gap-2 flex max-sm:flex-row-reverse max-sm:justify-end max-sm:w-full max-sm:overflow-auto">
        <div className="flex gap-5">
          {State && (
            <li
              className={`sm:hidden movingTransitionY`}
              onClick={handleSideBar}
            >
              <IoMdReorder
                size={45}
                className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
              />
              <div className="max-sm:text-[15px]">Menue</div>
            </li>
          )}
          <li
            className={` ${SideBar == "show" && "movingTransitionXForHome "} ${SideBar == "hide" && "disappearTransitionX1"} ${SideBar == "" && "ml-0"}`}
          >
            <Link to="/" className="flex flex-col items-center">
              <IoHomeOutline
                size={45}
                className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
              />
              <div className="max-sm:text-[15px]">Home</div>
            </Link>
          </li>
        </div>
        {!SideBar && (
          <div className="flex gap-11 movingTransitionX max-sm:flex-col max-sm:h-full max-sm:absolute left-0 top-0 z-10 max-sm:w-[30vw] max-sm:bg-linear-to-b max-sm:hidden from-purple-500 via-pink-500 to-orange-500">
            <div className="mx-auto sm:hidden mt-2.5" onClick={handleSideBar}>
              <RxCross1 size={30} onClick={handleSideBar} />
            </div>
            {State && (
              <li>
                <Link to="/orders" className={`flex flex-col items-center`}>
                  <MdOutlineBorderColor
                    size={45}
                    className={`p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%] `}
                  />
                  <div className="max-sm:text-[15px]">Orders</div>
                </Link>
              </li>
            )}
            {State.role === "admin" && (
              <li>
                <Link
                  to="/dashboard/posts"
                  className="flex flex-col items-center"
                >
                  <PiFilmReelLight
                    size={45}
                    className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
                  />
                  <div className="max-sm:text-[15px]">Posts</div>
                </Link>
              </li>
            )}
            {State.role === "admin" && (
              <li>
                <Link
                  to="/food-dashboard/food-items/"
                  className="flex flex-col items-center"
                >
                  <IoFastFoodOutline
                    size={45}
                    className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
                  />{" "}
                  <div className="max-sm:text-[15px]">Items</div>{" "}
                </Link>
              </li>
            )}
          </div>
        )}
        {/* {SideBar && ( */}
        <div
          className={`flex gap-11 ${SideBar === "" && "hidden"} ${SideBar == "show" && "movingTransitionX"} ${SideBar == "hide" && "disappearTransitionX"}  max-sm:flex-col max-sm:h-full max-sm:absolute left-0 top-0 z-10 max-sm:w-[30vw] max-sm:bg-linear-to-b sm:hidden from-purple-500 via-pink-500 to-orange-500`}
        >
          <div className="mx-auto sm:hidden mt-2.5 " onClick={handleSideBar}>
            <RxCross1 size={30} onClick={handleSideBar} />
          </div>
          {State && (
            <li>
              <Link to="/orders" className="flex flex-col items-center">
                <MdOutlineBorderColor
                  size={45}
                  className={`p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%] self-center`}
                />
                <div className="max-sm:text-[15px]">Orders</div>
              </Link>
            </li>
          )}
          {State.role === "admin" && (
            <li>
              <Link
                to="/dashboard/posts"
                className="flex flex-col items-center"
              >
                <PiFilmReelLight
                  size={45}
                  className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
                />
                <div className="max-sm:text-[15px]">Posts</div>
              </Link>
            </li>
          )}
          {State.role === "admin" && (
            <li>
              <Link
                to="/food-dashboard/food-items/"
                className="flex flex-col items-center"
              >
                <IoFastFoodOutline
                  size={45}
                  className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
                />{" "}
                <div className="max-sm:text-[15px]">Items</div>{" "}
              </Link>
            </li>
          )}
        </div>
        {/* )} */}
      </div>
      <div className="flex text-[20px] w-fit  justify-end self-end max-sm:gap-2">
        <li className="w-fit">
          {!State ? (
            <div className="flex movingTransitionXRight">
              <Link to="/auth/login" className="flex flex-col items-center">
                <CiLogin
                  size={45}
                  className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
                />
                Login
              </Link>
              {/* <Link to="/auth/signup">SignUp</Link> */}
            </div>
          ) : (
            <div className="flex justify-between gap-7 max-sm:gap-2 movingTransitionXRight  ">
              {location.pathname.split("/")[
                location.pathname.split("/").length - 1
              ] !== "cart" && (
                <Link to={"/cart"} className="flex flex-col items-center">
                  <IoCartOutline
                    size={45}
                    className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
                  />
                  <div className="max-sm:text-[15px]">Cart</div>

                  <div className="absolute top-8 ml-5 px-1  text-white bg-red-500 rounded-2xl text-[12px] h-fit ">
                    {Cart.length}
                  </div>
                </Link>
              )}
              <button
                className="cursor-pointer flex flex-col items-center pr-2"
                onClick={handleSignOut}
              >
                <IoIosLogOut
                  onClick={handleSignOut}
                  size={45}
                  className="p-2 hover:bg-gray-800/10 duration-200 hover:backdrop-blur-lg rounded-[50%]"
                />
                <div className="max-sm:text-[15px]">signOut</div>
              </button>
            </div>
          )}
        </li>
      </div>
    </ul>
  );
};

export default Header;
