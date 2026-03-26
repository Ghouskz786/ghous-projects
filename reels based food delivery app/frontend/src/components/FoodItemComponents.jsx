import React, { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import { sessionContext } from "../store/ReactStore";

const FoodItemComponents = ({ item, email, DeleteItem, setDeleteItem }) => {
  const navigation = useNavigate();
  const [Deleting, setDeleting] = useState(false);
  const [Errors, setErrors] = useState([]);
  const { Cart, setCart } = useContext(sessionContext);
  const location = useLocation();
  const handleDeleteItem = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/item/delete-item", {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          itemId: e.get("itemId"),
          email: item.uploadedBy,
        }),
      })
    ).json();

    if (
      !res.success &&
      res.messages[0] === "please login for uploading content"
    ) {
      navigation("/auth/login");
    }
    if (res.success) {
      setDeleteItem(!DeleteItem);
      setDeleting(false);
    } else {
      setErrors(res.messages);
    }
  };
  const handleDeleteSubmit = () => {
    setErrors([]);
    setDeleting(true);
  };
  const handleAddToCart = () => {
    setCart([...Cart, item]);
  };
  const handleRemoveCart = (e) => {
    const filteredCart = Cart.filter((item) => {
      return item.itemId !== e.target.id;
    });
    setCart(filteredCart);
  };

  return (
    <div className="w-fit movingTransitionX hover:scale-105 transition-all duration-500">
      <div className="w-[17vw] max-sm:w-[80vw] bg-white shadow-2xl  m-4 max-sm:mx-auto max-sm:mt-4.5 ">
        <div className="w-full h-[60%] relative">
          <div className="absolute top-2 right-3 bg-orange-500 text-white font-bold px-1 rounded-2xl">
            {item.itemPrice}Rs
          </div>
          <img
            src={item.url}
            alt="item image"
            className="rounded-tr-[25px] rounded-tl-[25px]"
          />
        </div>
        <div className="m-1.5 flex gap-1 flex-col text-slate-700">
          <div className="text-2xl bold capitalize">{item.itemName}</div>
          <div className="capitalize">{item.itemDescription}</div>
          <div className=" text-orange-400">{item.itemPrice}Rs</div>
        </div>

        {location.pathname.split("/")[
          location.pathname.split("/").length - 1
        ] !== "cart" ? (
          <div className="m-2 py-2">
            {email && (
              <div>
                {item.uploadedBy === email ? (
                  <form action={handleDeleteItem} onSubmit={handleDeleteSubmit}>
                    <input type="hidden" name="itemId" value={item.itemId} />
                    <button
                      type="submit"
                      disabled={Deleting}
                      className={`border  text-white w-full  rounded-[10px] px-5 py-1  ${Deleting ? "bg-linear-to-r from-red-300 to-pink-300" : "bg-linear-to-r from-red-500 to-pink-500"} cursor-pointer flex justify-center`}
                    >
                      {Deleting ? (
                        <div className="loader w-[15px] h-[15px] border-2 rounded-[50%] border-blue-400 border-l-white "></div>
                      ) : (
                        "Delete item"
                      )}
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="bg-linear-to-r from-orange-400 to-orange-600 w-full cursor-pointer text-slate-200 font-bold px-2 py-1 rounded-[10px] "
                  >
                    🛒 Add To Cart
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleRemoveCart}
            id={item.itemId}
            className="bg-linear-to-r from-red-500 to-pink-500 cursor-pointer w-full font-bold px-2 py-1 my-2 rounded-[10px] text-white"
          >
            remove from cart
          </button>
        )}
      </div>
      {Errors.length !== 0 && <ErrorComponent Error={Errors} />}
    </div>
  );
};

export default FoodItemComponents;
