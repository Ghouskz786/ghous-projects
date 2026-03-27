import React, { useEffect } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
const Contact = () => {
  const [Errors, setErrors] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ref, InView] = useInView({ threshold: 0.1 });
  const [ApplyTransition, setApplyTransition] = useState(false);
  useEffect(() => {
    console.log(InView);
    if (InView) {
      setApplyTransition(true);
    } else {
      setApplyTransition(false);
    }
  }, [InView]);
  const handleContactForm = async (e) => {
    const res = await (
      await fetch("https://ghous-projects.vercel.app/contact/contact-me", {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: e.get("name"),
          email: e.get("email"),
          message: e.get("message"),
        }),
      })
    ).json();

    if (!res.success) {
      setErrors(res.messages);
    }
    setLoading(false);
  };
  const handleFormSubmit = () => {
    setLoading(true);
  };
  return (
    <div>
      <div className="flex flex-col gap-3.5 items-center mt-22" ref={ref}>
        <div
          className={`${ApplyTransition ? "movingTransitionY" : "opacity-0"}`}
        >
          Connect with me
        </div>
        <div
          className={`text-4xl font-bold  ${ApplyTransition ? "movingTransitionX" : "opacity-0"}`}
        >
          Get in touch
        </div>
        <div
          className={`${ApplyTransition ? "movingTransitionXRight" : "opacity-0"} sm:w-[35vw] max-sm:w-[80vw] text-center mt-4`}
        >
          I'd love to hear from you! if you have any question, comments, or
          feedback, please use the form below
        </div>
        <form
          action={handleContactForm}
          onSubmit={handleFormSubmit}
          className={`flex ${ApplyTransition ? "movingTransitionX" : "opacity-0"} flex-col gap-3.5 mt-6`}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="border border-white outline-0 border-t-slate-400 shadow-2xl  rounded-[10px] py-1.5 sm:w-[35vw] max-sm:w-[80vw]  px-2.5"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="border border-white outline-0 border-t-slate-400 sm:w-[35vw] shadow-2xl max-sm:w-[80vw]  rounded-[10px] py-1.5 px-2.5"
          />

          <textarea
            name="message"
            placeholder="Enter message here"
            rows={10}
            className="shadow-2xl outline-0 border px-2 py-1.5 border-white rounded-[10px] border-t-slate-400 "
          ></textarea>
          <button
            type="submit"
            disabled={Loading}
            className={`rounded-[999px] flex items-center justify-center px-7 ${ApplyTransition ? "movingTransitionYDown" : "opacity-0"} py-1.5 ${!Loading ? "bg-black" : "bg-slate-700"} text-white self-center sm:w-[12vw] max-sm:w-[50vw]`}
          >
            {!Loading ? (
              <span>submit now →</span>
            ) : (
              <div className="w-[20px] h-[20px] loader border-2 border-white rounded-[50%] border-t-black "></div>
            )}
          </button>
          {Errors.map((item, idx) => {
            return (
              <div className="text-red-400 text-[13px]" key={idx}>
                . {item}
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default Contact;
