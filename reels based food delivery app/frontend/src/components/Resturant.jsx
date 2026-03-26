import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ErrorComponent from "./ErrorComponent";
import FoodItemComponents from "./FoodItemComponents";
import { sessionContext } from "../store/ReactStore";
import Footer from "./Footer";
const Resturant = () => {
  const param = useParams();
  const [Resturant, setResturant] = useState([]);
  const [Errors, setErrors] = useState([]);
  const { State, setState } = useContext(sessionContext);
  const [DeleteItem, setDeleteItem] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/item/get-item-by-resturant-name", {
          method: "post",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ resturantName: param.resturantName }),
        })
      ).json();
      if (res.success) {
        setResturant(res.resturant);
      } else {
        setErrors(res.messages);
      }
    })();
  }, [DeleteItem]);
  if (Errors.length !== 0) {
    <ErrorComponent Error={Errors} />;
  }
  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="text-center movingTransitionY text-3xl my-3.5 font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-purple-400 to-orange-400">
        Welcome to {Resturant.resturantName}!
      </div>
      <div className="flex flex-wrap movingTransitionX justify-center">
        {Resturant.length !== 0 &&
          Resturant.items.map((item, idx) => {
            return (
              <FoodItemComponents
                setDeleteItem={setDeleteItem}
                DeleteItem={DeleteItem}
                email={State.email}
                key={idx}
                item={item}
              />
            );
          })}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Resturant;
