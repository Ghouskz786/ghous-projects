import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import style from "../style/videoComponent.module.css";
import { useInView } from "react-intersection-observer";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import CommentComponent from "./CommentComponent";
import { sessionContext } from "../store/ReactStore";
import { RiDeleteBin7Fill } from "react-icons/ri";
const PausedVideoComponent = ({ idx, item, email, setDelete, Delete }) => {
  const divRef = useRef();
  const videoRef = useRef();
  const [VideoPaused, setVideoPaused] = useState(false);
  const { State, setState } = useContext(sessionContext);
  const [VideoPlay, setVideoPlay] = useState(false);
  const [ShowComments, setShowComments] = useState(false);
  const [Liked, setLiked] = useState(false);
  const [VideoLoaded, setVideoLoaded] = useState(true);
  const [ErrorOccured, setErrorOccured] = useState(false);
  useEffect(() => {
    item.likedBy.forEach((item) => {
      if (item.email === State.email) {
        setLiked(true);
      }
    });
    if (item.likedBy?.includes({ email: State.email })) {
      setLiked(true);
    }
  }, []);
  const handleTimeUpdate = (e) => {
    divRef.current &&
      (divRef.current.style.width =
        (e.target.currentTime / e.target.duration) * 100 + "%");
  };
  const handleScroll = (e) => {
    videoRef.current.currentTime =
      (e.nativeEvent.offsetX / videoRef.current.width) *
      videoRef.current.duration;
  };
  const handleVideoPlay = (e) => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPaused(false);
      setVideoPlay(true);
    } else {
      videoRef.current.pause();
      setVideoPlay(false);
      setVideoPaused(true);
    }
    setTimeout(() => {
      setVideoPaused(false);
      setVideoPlay(false);
    }, 600);
  };
  const hanldeShowComments = () => {
    setShowComments(!ShowComments);
  };
  const handleLike = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/post/toggle-like", {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: State.email, postId: e.get("postId") }),
      })
    ).json();

    if (!res.success) {
      if (res.messages[0] === "login to make comment") {
        setState("");
      }
    } else {
      let liked = false;
      res.likes.forEach((item) => {
        if (item.email === State.email) {
          liked = true;
        }
      });
      item.likedBy = res.likes;
      setLiked(liked);
    }
  };
  const handleLoad = () => {
    setVideoLoaded(true);
  };
  const handleLoadStart = (e) => {
    setVideoLoaded(false);
  };
  const handleErrorWhileLoading = (e) => {
    // setErrorOccured(true);
  };
  const handleDeletePost = async (e) => {
    const res = await (
      await fetch("http://localhost:3000/post/delete-post", {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: e.get("email"),
          postId: e.get("postId"),
        }),
      })
    ).json();

    if (
      !res.success &&
      res.messages[0] === "please login for uploading content"
    ) {
      setState("");
    }
    if (res.success) {
      setDelete(!Delete);
    }
  };
  if (ErrorOccured) {
    return (
      <div className="flex gap-3.5 h-[78vh] w-full items-center justify-center">
        <div>reload to watch this video</div>
      </div>
    );
  }
  return (
    <div
      key={idx}
      className="flex gap-3.5 h-fit movingTransitionX max-sm:h-fit mx-7  items-center my-3"
    >
      <div className="snap-start w-fit h-fit  flex flex-col justify-center">
        <div className="flex relative">
          {VideoPlay && (
            <div className="flex justify-center opacity-70 absolute z-30 self-center ml-[70px] items-center p-3.5 rounded-[50%] border ">
              <CiPlay1 onClick={handleVideoPlay} size={70} z={40} />
            </div>
          )}
          {VideoPaused && (
            <div className="flex opacity-70 justify-center absolute z-30 self-center ml-[70px] items-center p-3.5 rounded-[50%] border ">
              <CiPause1 onClick={handleVideoPlay} size={70} />
            </div>
          )}
          <video
            src={item.url}
            ref={videoRef}
            onClick={handleVideoPlay}
            className="contain-content "
            onLoadStart={handleLoadStart}
            onLoadedData={handleLoad}
            onError={handleErrorWhileLoading}
            loop
            width={250}
            id={idx}
            preload="true"
            onTimeUpdate={handleTimeUpdate}
          ></video>
          {State && (
            <form action={handleDeletePost} className="absolute right-2 top-2">
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="postId" value={item.postId} />
              <button
                type="submit"
                className="cursor-pointer rounded-2xl text-slate-200 font-bold bg-linear-to-r from-red-700 to-red-500 px-2.5"
              >
                Delete 🗑️
              </button>
            </form>
          )}
          {!VideoLoaded && (
            <div
              className={`${style.loader} w-[100px] h-[100px] border-3 border-black rounded-[50%] border-r-white absolute z-30 self-center ml-[50px]`}
            ></div>
          )}
        </div>
        {VideoLoaded && (
          <div
            ref={divRef}
            className="progressBar min-h-1  bg-red-500 "
            onClick={handleScroll}
          ></div>
        )}
      </div>

      {VideoLoaded && (
        <div className="flex flex-col gap-4 ">
          <div>
            {State && (
              <form action={handleLike} className="flex flex-col items-center">
                <input type="hidden" name="postId" value={item._id} />
                <button type="submit">
                  {!Liked ? (
                    <FcLikePlaceholder className="cursor-pointer" size={30} />
                  ) : (
                    <FcLike className="cursor-pointer" size={30} />
                  )}
                </button>
                <div>{item.likedBy.length}</div>
              </form>
            )}
            <div>
              {!ShowComments ? (
                <MdOutlineInsertComment
                  size={30}
                  onClick={hanldeShowComments}
                  color="rgba(000,000,255,0.7)"
                  className="cursor-pointer"
                />
              ) : (
                <MdOutlineCommentsDisabled
                  onClick={hanldeShowComments}
                  size={30}
                  color="rgba(255,000,000,0.7)"
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="max-sm:absolute max-sm:w-full max-sm:bottom-20 max-sm:left-0 sm:h-[75vh]">
        {ShowComments && (
          <CommentComponent
            setShowComment={setShowComments}
            PostId={item._id}
          ></CommentComponent>
        )}
      </div>
    </div>
  );
};

export default PausedVideoComponent;
