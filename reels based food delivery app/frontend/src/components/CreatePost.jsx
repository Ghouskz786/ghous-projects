import React, { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import itemSchema from "../../Schema/ItemsSchema";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { sessionContext } from "../store/ReactStore";
import LoadingComponent from "./LoadingComponent";
import Footer from "./Footer";
const CreatePost = () => {
  const [Errors, setErrors] = useState();
  const [Login, setLogin] = useState(false);
  const { setState } = useContext(sessionContext);
  const [Loading, setLoading] = useState(false);
  const [LoadingCreatingPost, setLoadingCreatingPost] = useState(false);
  const [FileSelected, setFileSelected] = useState(false);
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

      clearTimeout(timeout);
      setLoading(false);
    })();
  }, []);
  const handleCreatePostAction = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/get-session", {
        credentials: "include",
      })
    ).json();

    if (!res.state) {
      setErrors(["Session have been expired login again"]);
      setState("");
      setLogin(true);
    } else if (res.state.role !== "admin") {
      setErrors(["only admin can upload an item"]);
    } else {
      try {
        itemSchema.parse({
          itemName: e.get("itemName"),
          itemDescription: e.get("itemDescription"),
          itemContent: e.get("itemContent"),
        });
        const formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({
            itemName: e.get("itemName"),
            itemDescription: e.get("itemDescription"),
            uploadedBy: res.state.email,
            resturantName: res.state.resturantName,
          }),
        );
        formData.append("itemContent", e.get("itemContent"));
        const resFromUploads = await (
          await fetch("http://localhost:3000/post/upload-post", {
            method: "POST",
            credentials: "include",

            body: formData,
          })
        ).json();
        if (!resFromUploads.success) {
          setErrors(resFromUploads.messages);
        }
      } catch (error) {
        const errorArray = JSON.parse(error).map((item) => {
          return item.message;
        });
        setErrors(errorArray);
      }
    }
    setFileSelected(false);
    setLoadingCreatingPost(false);
  };
  const handleLoadingCreatePost = () => {
    setLoadingCreatingPost(true);
  };
  const handleFileSelect = (e) => {
    setFileSelected(true);
  };
  const handleClearError = () => {
    setErrors([]);
  };
  if (Loading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <form
        className="flex flex-col w-fit p-3.5 border-4 border-white border-t-slate-800 rounded-[30px] shadow-2xl ml-9 max-sm:ml-2 h-[70%] mt-7 mx-atuo  gap-5 my-6"
        action={handleCreatePostAction}
        onSubmit={handleLoadingCreatePost}
      >
        <div className="bg-clip-text text-3xl mx-auto my-3 font-bold text-transparent bg-linear-to-r from-purple-600 to-orange-400">
          Add A New Post
        </div>
        <input
          type="text"
          className="border border-slate-500 rounded-[10px] px-2.5 py-1 w-[29vw] max-sm:w-[80vw]"
          name="itemName"
          placeholder="Enter the post title"
        />
        <input
          type="text"
          className="border border-slate-500 rounded-[10px] px-2.5 py-1 w-[29vw] max-sm:w-[80vw]"
          name="itemDescription"
          placeholder="Enter the item description"
        />
        <div>
          <input
            type="file"
            name="itemContent"
            className="border border-slate-500 w-[29vw] max-sm:w-[80vw]  opacity-0 absolute"
            max={1}
            onInput={handleFileSelect}
          />
          <div className="bg-linear-to-r from-purple-700 to-orange-400 text-white rounded-[10px] w-[29vw] max-sm:w-[80vw]   text-center font-bold py-1.5 px-3.5 ">
            Select File
          </div>
        </div>
        {FileSelected && <div className="text-green-400">File selected</div>}
        <button
          type="submit"
          disabled={LoadingCreatingPost}
          onClick={handleClearError}
          className={`border  self-start  text-white rounded-[10px] px-5 py-1  ${LoadingCreatingPost ? "bg-linear-to-r from-purple-500 to-orange-300" : "bg-linear-to-r from-purple-700 to-orange-400"} cursor-pointer w-[29vw] max-sm:w-[80vw] flex justify-center text-center font-bold `}
        >
          {LoadingCreatingPost ? (
            <div className="loader w-[25px] h-[25px] border-2 rounded-[50%] border-white border-l-black "></div>
          ) : (
            "Create Post"
          )}
        </button>
      </form>
      {Errors && <ErrorComponent Error={Errors}></ErrorComponent>}
      {Login && (
        <Link to="/auth/login" className="cursor-pointer ">
          Go to login page
        </Link>
      )}
    </div>
  );
};

export default CreatePost;
