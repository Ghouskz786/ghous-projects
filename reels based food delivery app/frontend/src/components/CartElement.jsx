import React, { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { sessionContext } from "../store/ReactStore";
import FoodItemComponents from "./FoodItemComponents";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import OrderSchema from "../../Schema/OrderSchema";
const CartElement = () => {
  const navigate = useNavigate();
  const { Cart, State, setCart } = useContext(sessionContext);
  const path = useLocation();
  const [Price, setPrice] = useState("");
  const [ShowOrderForm, setShowOrderForm] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Errors, setErrors] = useState([]);
  const navig = useNavigate();
  useEffect(() => {
    if (State == "") {
      navig("/");
    }
    if (Cart.length !== 0) {
      let calculate = "";
      Cart.forEach((item) => {
        calculate += "+" + item.itemPrice;
      });

      setPrice(eval(calculate));
    } else {
      setPrice("");
    }
  }, [Cart]);

  const handleHideCart = () => {
    const pathToBeNavigated = path.pathname.split("/").filter((item) => {
      if (item !== "cart") {
        return "/" + item;
      }
    });

    navigate(path.pathname.replace("cart", ""));
  };
  const handleOrderNow = async (e) => {
    try {
      OrderSchema.parse({
        address: e.get("address"),
      });
      const res = await (
        await fetch("http://localhost:3000/order/make-order", {
          method: "post",
          body: JSON.stringify({
            email: State.email,

            address: e.get("address"),

            price: Price,
            cart: Cart,
          }),
          credentials: "include",
          headers: { "content-type": "application/json" },
        })
      ).json();
      if (!res.success && res.messages[0] === "login to make comment") {
        setErrors(["please login to make an order"]);
      } else {
        setCart([]);
      }
    } catch (err) {
      const errorArray = JSON.parse(err).map((item) => {
        return item.message;
      });
      setErrors(errorArray);
    }

    setLoading(false);
  };
  const handleShowOrder = () => {
    setShowOrderForm(!ShowOrderForm);
  };
  const handleBtnLooks = () => {
    setLoading(true);
  };
  return (
    <div>
      <div
        className={`w-[65vw] overflow-auto max-sm:w-[90vw] movingTransitionYDown   flex flex-col absolute top-[10%] left-[20%] max-sm:left-[5%] bg-white h-[75vh] shadow-2xl rounded-[20px] border-4 border-transparent border-t-slate-700 ${ShowOrderForm && "blur-sm pointer-events-none"} `}
      >
        <button
          className="absolute right-2.5 top-2.5 rounded-[50%]  bg-red-600  p-1"
          onClick={handleHideCart}
        >
          <RxCross1 size={20} color="white" onClick={handleHideCart} />
        </button>
        <div className="bg-clip-text text-transparent text-3xl font-bold mt-3 ml-3 bg-linear-to-r from-purple-700 to-purple-500">
          🛒 Your Cart
        </div>
        <div className="flex flex-wrap  justify-center">
          {Cart.map((item, idx) => {
            return <FoodItemComponents item={item} key={idx} />;
          })}
        </div>
        {Cart.length === 0 && (
          <div className="text-slate-700 mx-auto mt-3.5">
            Your cart is empty
          </div>
        )}
        <button
          disabled={Price == "" || ShowOrderForm}
          onClick={handleShowOrder}
          className={`font-bold cursor-pointer  w-fit p-1 text-white ml-auto mt-auto my-3 mb-5 mr-4 rounded ${Price == "" ? "bg-green-300" : "bg-green-400"}`}
        >
          {Price != "" && Price + " Pkr"} Order Now 💳
        </button>
      </div>
      {ShowOrderForm && (
        <div className=" w-[50vw] overflow-auto max-sm:w-[80vw]   flex flex-col absolute top-[20%] left-[30%] max-sm:left-[10%] bg-white h-[60vh] shadow-2xl">
          <button
            className="absolute right-2.5 top-2.5 rounded-[50%] bg-red-500 border-white border-2 p-1.5 cursor-pointer"
            onClick={handleShowOrder}
          >
            <RxCross1 size={20} onClick={handleShowOrder} />
          </button>
          <div>
            <form
              action={handleOrderNow}
              onSubmit={handleBtnLooks}
              className="flex flex-col items-center justify-center  p-9   mx-auto sm:max-w-[30vw] h-[50vh] max-sm:h-[40vh] gap-3  max-sm:w-[80vw]"
            >
              <input
                type="text"
                name="address"
                className="border border-slate-500 rounded w-[25vw] max-sm:w-[70vw] px-2.5 py-1 "
                placeholder="Enter your address here"
              />

              <div className="bg-blue-400 flex flex-row items-center gap-1 px-1  text-white ">
                <span className="text-[12px]"> Order value</span>{" "}
                <span className="font-bold">{Price} Rs</span>
              </div>
              <button
                type="submit"
                disabled={Loading}
                className={`border border-slate-400 rounded text-white font-bold px-5 py-1  ${Loading ? "bg-green-300" : "bg-green-500"} cursor-pointer w-[12vw] max-sm:w-[40vw] flex justify-center`}
              >
                {Loading ? (
                  <div className="loader w-[25px] h-[25px] border-2 rounded-[50%] border-white border-l-black "></div>
                ) : (
                  `Order now `
                )}
              </button>
            </form>
            {Errors.length !== 0 && (
              <ErrorComponent Error={Errors}></ErrorComponent>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartElement;
