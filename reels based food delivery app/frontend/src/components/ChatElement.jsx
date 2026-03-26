import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import { sessionContext } from "../store/ReactStore";
import Footer from "./Footer";
import { socket } from "../Service/SocketCreation";
const ChatElement = () => {
  const params = useParams();
  const [Loading, setLoading] = useState(false);
  const [Errors, setErrors] = useState([]);
  const { setCart, setState, State } = useContext(sessionContext);
  const [Chat, setChat] = useState("");
  const [MessageSent, setMessageSent] = useState(false);
  const navigation = useNavigate();
  const [Status, setStatus] = useState("offline");
  const handleSendMessage = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/order/add-message", {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          from: State.email,
          to: Chat.from == State.email ? Chat.to : Chat.from,
          message: e.get("message"),
          orderId: params.chatId,
        }),
      })
    ).json();
    if (!res.success) {
      if (res.messages[0] == "login please") {
        navigation("/auth/login");
      } else {
        setErrors(res.messages);
      }
    } else {
      socket.emit("message-sent", {
        to: Chat.from == State.email ? Chat.to : Chat.from,
      });
      setMessageSent(!MessageSent);
    }
  };
  const recievedEvent = ({ success }) => {
    setMessageSent(!MessageSent);
  };
  const statusFunction = ({ status, statusMail }) => {
    let myEmail = State.email != Chat.from ? Chat.from : Chat.to;

    if (myEmail === statusMail) {
      setStatus(status);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 300);
    (async () => {
      const resObj = await (
        await fetch("http://localhost:3000/get-session", {
          credentials: "include",
        })
      ).json();

      if (!resObj.state) {
        setCart([]);
        setState("");
        navigation("/auth/login");
      } else {
        const res = await (
          await fetch("http://localhost:3000/order/get-order-by-id", {
            method: "post",
            credentials: "include",
            body: JSON.stringify({ orderId: params.chatId }),
            headers: { "content-type": "application/json" },
          })
        ).json();
        if (res.success) {
          setChat(res.order);

          socket.emit("new-user-connected", {
            email: resObj.state.email,
            to:
              res.order.to == resObj.state.email
                ? res.order.from
                : res.order.to,
          });
        } else if (!res.success) {
          if (res.messages[0] == "login please") {
            navigation("/auth/login");
          } else {
            setErrors(res.messages);
          }
        } else {
          navigation("/orders");
        }
      }

      clearTimeout(timeout);
      setLoading(false);
    })();
  }, [MessageSent, Status]);
  useEffect(() => {
    if (Chat) {
      socket.on("status-update", statusFunction);
    }
  }, [Chat]);

  useEffect(() => {
    socket.on("message-recieved", recievedEvent);
    return () => {
      socket.off("message-recieved", recievedEvent);
      socket.off("status-update", statusFunction);
    };
  }, []);
  if (Errors.length !== 0) {
    return <ErrorComponent Error={Errors} />;
  }
  if (Loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      {Chat && State && Status && (
        <div>
          <div className="w-full flex bg-linear-to-r py-3 px-2 fixed top-0 from-purple-500 via-pink-500 to-orange-500">
            <Link
              className="text-3xl font-bold max-sm:text-[25px] text-white"
              to={"/orders"}
            >
              {"<-"}
            </Link>
            <div className="flex flex-col self-center mx-auto ">
              <span className="text-2xl max-sm:text-[15px] font-bold text-white ">
                {Chat.from == State.email ? Chat.to : Chat.from}
              </span>
              <span className="text-white text-center">{Status}</span>
            </div>
          </div>
          {Chat.messages.length !== 0 && (
            <div className="w-full flex flex-col flex-wrap px-3.5 mb-11 mt-25 overflow-y-auto">
              {Chat.messages.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`
                     ${item.from == State.email ? "self-end" : "self-start"}
                    flex my-3 py-2 px-7 shadow-2xl rounded-2xl bg-linear-to-r from-purple-200 to-pink-200 text-slate-800`}
                  >
                    <span>{item.message}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div>
            <form
              action={handleSendMessage}
              className="flex w-full fixed bottom-0 pb-2.5 left-[15%] bg-white max-sm:left-[10%]"
            >
              <input
                type="text"
                name="message"
                placeholder="Enter the message"
                className="w-[70vw] border border-r-0 px-1.5"
              />
              <button
                type="submit"
                className="bg-green-400 py-1.5 px-2 font-bold border border-black border-l-0 text-white"
              >
                Send
              </button>
            </form>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default ChatElement;
