import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { sessionContext } from "../store/ReactStore";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
const CommentComponent = ({ comments, PostId, setShowComment }) => {
  const { State, setState } = useContext(sessionContext);
  const [Comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/post/get-comments", {
          method: "post",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ postId: PostId }),
        })
      ).json();
      if (res.success) {
        setComments(res.comments);
      }
    })();
  }, []);

  const handleCommentForm = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/post/make-comment", {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          postId: e.get("postId"),
          email: State.email,
          message: e.get("message"),
        }),
      })
    ).json();
    if (!res.success) {
      setState("");
    } else {
      setComments(res.comment);
      comments = res.comment;
    }
  };
  const handleShowComments = () => {
    setShowComment(false);
  };
  return (
    <div className="relative max-sm:absolute CommentTransition max-sm:w-full shadow-2xl p-5 h-full">
      <div className="overflow-scroll   max-sm:absolute max-sm:bg-white max-sm:h-[70vh] max-sm:w-full max-sm:left-0 max-sm:bottom-0 flex flex-col h-full  justify-between py-2.5 px-3.5 ">
        <button
          className="w-fit absolute right-1 top-1  bg-white  rounded-[50%] border-slate-400 border p-1"
          onClick={handleShowComments}
        >
          <RxCross1 size={20} onClick={handleShowComments} />
        </button>

        <div>
          {State ? (
            <form action={handleCommentForm} className="flex gap-3 flex-col">
              <input
                type="text"
                name="message"
                placeholder="Type Comment"
                className="border border-gray-900 px-3"
              />
              <input type="hidden" name="postId" value={PostId} />
              <button
                type="submit"
                className="ml-auto cursor-pointer rounded-[10px] w-fit px-3.5 border bg-linear-to-r from-orange-400 to-orange-600 text-white"
              >
                comment
              </button>
            </form>
          ) : (
            <Link
              to="/auth/login"
              className="text-white font-bold w-[80%] min-h-[7vh] text-center flex items-center justify-center mx-auto bg-linear-to-r from-red-400 to-red-600"
            >
              Sign In To Make Coment
            </Link>
          )}
        </div>
        <div className="mb-3.5">
          {Comments.length !== 0 ? (
            <ul>
              {Comments.map((item) => {
                return (
                  <li
                    key={item._id}
                    className="flex flex-col my-2.5 border rounded-2xl px-1.5 py-1 shadow-2xl"
                  >
                    <div className="text-[10px]">{item.email}</div>
                    <div>{item.message}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mx-auto self-center">No comments to show here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
