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
import { Link } from "react-router-dom";
const VideoComponent = ({ item, idx, setLoadContent }) => {
  const [ref, inView] = useInView({ threshold: 0.7 });
  const divRef = useRef();
  const videoRef = useRef();
  const [VideoPaused, setVideoPaused] = useState(false);
  const { State, setState } = useContext(sessionContext);
  const [VideoPlay, setVideoPlay] = useState(false);
  const [ShowComments, setShowComments] = useState(false);
  const [Liked, setLiked] = useState(false);
  const [VideoLoaded, setVideoLoaded] = useState(true);
  const [ErrorOccured, setErrorOccured] = useState(false);
  const [DescriptionVisibility, setDescriptionVisibility] = useState(false);
  useEffect(() => {
    item.likedBy.forEach((item) => {
      if (item.email === State.email) {
        setLiked(true);
      }
    });
    if (item.likedBy?.includes({ email: State.email })) {
      setLiked(true);
    }
    if (inView) {
      videoRef.current?.play();
    } else {
      !videoRef.current?.paused && videoRef.current?.pause();
    }
    setLoadContent(videoRef.current?.id);
  }, [inView]);
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
  const hanldeDescriptionVisibility = () => {
    setDescriptionVisibility(!DescriptionVisibility);
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
      className="flex gap-3.5 h-[78vh] max-sm:h-full max-sm:justify-around w-full overflow-hidden max-sm:flex-col-reverse sm:ml-16 items-center snap-start "
    >
      <div className="flex flex-col sm:self-end max-sm:w-full    w-[30%] min-h-[15%]  ">
        <div className="flex items-center gap-1.5">
          {" "}
          <div>{item.resturantName}</div>{" "}
          <Link
            to={`/resturant/${item.resturantName}`}
            className="bg-linear-to-r from-orange-500  to-red-700 text-white rounded-2xl w-fit px-3 cursor-pointer"
          >
            Visit Resturant
          </Link>
        </div>
        <div className="capitalize text-2xl">{item.postTitle}</div>
        <div
          onClick={hanldeDescriptionVisibility}
          className={`overflow-auto  cursor-pointer  ${DescriptionVisibility ? "h-full overflow-auto" : "h-6 truncate"}`}
        >
          {item.postDescription}
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <div
          ref={ref}
          className="snap-start w-fit max-sm:w-full h-[80vh] max-sm:h-full flex flex-col justify-center  rounded-[20px] "
        >
          <div>
            <div className="flex">
              {VideoPlay && (
                <div className="flex justify-center opacity-70 absolute z-30 self-center ml-[100px] items-center p-3.5 rounded-[50%] border ">
                  <CiPlay1 onClick={handleVideoPlay} size={70} z={40} />
                </div>
              )}
              {VideoPaused && (
                <div className="flex opacity-70 justify-center absolute z-30 self-center ml-[100px] items-center p-3.5 rounded-[50%] border ">
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
                width={279}
                id={idx}
                preload="true"
                onTimeUpdate={handleTimeUpdate}
              ></video>
              {!VideoLoaded && (
                <div
                  className={`${style.loader} w-[100px] h-[100px] border-3 border-blue-500 rounded-[50%] border-r-white absolute z-30 self-center ml-[100px]`}
                ></div>
              )}
            </div>
            {VideoLoaded && (
              <div
                ref={divRef}
                className="progressBar h-1 bg-red-500 "
                onClick={handleScroll}
              ></div>
            )}
          </div>
        </div>
        {VideoLoaded && (
          <div className="flex flex-col gap-4 max-sm:absolute max-sm:right-2">
            {State && (
              <form action={handleLike} className="flex flex-col items-center ">
                <input type="hidden" name="postId" value={item._id} />
                <button type="submit">
                  {!Liked ? (
                    <FcLikePlaceholder className="cursor-pointer" size={40} />
                  ) : (
                    <FcLike className="cursor-pointer" size={40} />
                  )}
                </button>
                <div className="font-bold">{item.likedBy.length}</div>
              </form>
            )}
            <div>
              {!ShowComments ? (
                <MdOutlineInsertComment
                  size={40}
                  onClick={hanldeShowComments}
                  className="cursor-pointer"
                  color="rgba(000,000,255,0.6)"
                />
              ) : (
                <MdOutlineCommentsDisabled
                  onClick={hanldeShowComments}
                  size={40}
                  color="rgba(255,000,000,0.6)"
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        )}
      </div>
      {ShowComments && (
        <div className="h-full w-fit max-sm:w-full  max-sm:absolute  transition-all duration-200">
          <CommentComponent
            PostId={item._id}
            setShowComment={setShowComments}
          ></CommentComponent>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;
