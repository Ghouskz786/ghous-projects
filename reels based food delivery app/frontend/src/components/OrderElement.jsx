import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import { sessionContext } from "../store/ReactStore";
import { useState, useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent.jsx";
import EachOrderComponent from "./EachOrderComponent.jsx";
const OrderElement = () => {
  const [Loading, setLoading] = useState(false);
  const { setState, State, setCart } = useContext(sessionContext);
  const navigation = useNavigate();
  const [Orders, setOrders] = useState([]);
  const [Errors, setErrors] = useState([]);
  const [RenderDone, setRenderDone] = useState(false);
  const [StateChange, setStateChange] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 300);
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/get-session", {
          credentials: "include",
        })
      ).json();

      if (!res.state) {
        setCart([]);
        setState("");
        navigation("/auth/login");
      } else {
        setState(res.state);
        const orderRes = await (
          await fetch("http://localhost:3000/order/get-orders", {
            credentials: "include",
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: res.state.email }),
          })
        ).json();

        if (!orderRes.success) {
          setErrors(orderRes.messages);
        } else {
          setOrders(orderRes.orders);
        }
      }
      setRenderDone(true);
      clearTimeout(timeout);
      setLoading(false);
    })();
  }, [StateChange]);
  if (Errors.length !== 0) {
    return <ErrorComponent Error={Errors}></ErrorComponent>;
  }
  if (Loading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      {RenderDone && (
        <div className="flex flex-col">
          <Header></Header>
          <h1 className=" bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent w-fit self-center">
            Order List
          </h1>
          {Orders.length !== 0 ? (
            <div className="max-sm:justify-center flex">
              {Orders.map((item, idx) => {
                return (
                  <div className="flex" key={idx}>
                    <EachOrderComponent
                      order={item}
                      StateChange={StateChange}
                      setStateChange={setStateChange}
                    ></EachOrderComponent>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="font-bold text-2xl transition-all delay-500">
              No Orders To Show Here
            </div>
          )}
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default OrderElement;
