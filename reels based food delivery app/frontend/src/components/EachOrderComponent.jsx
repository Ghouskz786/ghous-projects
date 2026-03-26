import React from "react";
import { sessionContext } from "../store/ReactStore";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
const EachOrderComponent = ({ order, setStateChange, StateChange }) => {
  const { State } = useContext(sessionContext);
  const [ShowOrders, setShowOrders] = useState(false);
  const [Errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleShowOrders = () => {
    setShowOrders(!ShowOrders);
  };
  const handleChangeStatus = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/order/change-order-status", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ orderId: e.target.id }),
        headers: { "content-type": "application/json" },
      })
    ).json();
    if (res.success == false) {
      if (res.messages[0] == "login please") {
        navigate("/auth/login");
      } else {
        setErrors(res.messages);
      }
    } else {
      setStateChange(!StateChange);
    }
  };
  if (Errors.length !== 0) {
    return <ErrorComponent Error={Errors}></ErrorComponent>;
  }
  return (
    <div className="relative movingTransitionX">
      <div
        className={`flex flex-col  gap-4 py-3.5 px-3.5 shadow-2xl  rounded-[5px] ${
          ShowOrders && "blur-sm pointer-events-none"
        }`}
      >
        <div className="text-2xl font-bold">Order Details</div>
        <div className="flex gap-3 flex-col">
          <div className="flex flex-col">
            <span>From:</span>
            <span>{order.from}</span>
          </div>
          <div className="flex flex-col">
            <span>To:</span>
            <span>{order.to}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span>Address:</span>
          <span>{order.deliveryAddress}</span>
        </div>
        <div className="flex flex-col">
          <span>Order Value:</span>
          <span>{order.totalValue}Rs</span>
        </div>
        <div
          className={`absolute right-1 top-1 text-white font-bold rounded-2xl  px-2 ${order.status == "pending" ? "bg-orange-400" : "bg-green-400"}`}
        >
          {order.status}
        </div>
        <button
          className="cursor-pointer bg-linear-to-r from-pink-500 to-purple-500 rounded-[10px] w-fit text-white font-bold px-2.5"
          onClick={handleShowOrders}
        >
          Show items
        </button>
        <div className="flex gap-2 h-10">
          {State.email == order.to &&
            !(order.status.trim().toLowerCase() == "delivered") && (
              <button
                className="bg-linear-to-r max-w-[99%] min-w-[50%] from-purple-500 to-pink-500   rounded-[5px] text-white font-bold"
                onClick={handleChangeStatus}
                id={order._id}
              >
                Change Status
              </button>
            )}
          <Link
            className={`bg-linear-to-r max-w-[99%] min-w-[50%] flex justify-center items-center from-purple-400 via-pink-400 to-orange-400 rounded-[5px] text-white font-bold ${
              (State.email == order.from ||
                order.status.trim().toLowerCase() == "delivered") &&
              "w-full"
            }`}
            to={`/chat/${order._id}`}
          >
            Chat
          </Link>
        </div>
      </div>
      {ShowOrders && (
        <div className="movingTransitionXRight absolute top-4 left-7 bg-red bg-white shadow-2xl rounded-[5px] w-[80%] h-[90%]">
          <div>
            <button
              className={`cursor-pointer bg-linear-to-r float-right relative top-1 right-1 from-pink-500 to-purple-500 rounded-[10px] w-fit text-white font-bold px-2.5 ${ShowOrders && "movingTransitionX"}`}
              onClick={handleShowOrders}
            >
              Hide
            </button>
            <div className="text-2xl font-bold pl-1.5 pt-2">Food Items</div>
            <div>
              {order.items.map((item) => {
                return (
                  <div className="flex gap-2.5 mx-2.5 my-2.5 flex-wrap">
                    <span className="font-bold">.</span>
                    <span>{item.itemName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EachOrderComponent;
