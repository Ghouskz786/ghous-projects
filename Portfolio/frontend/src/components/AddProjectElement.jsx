import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AddProjectElement = () => {
  const [Loading, setLoading] = useState(false);
  const [Errors, setErrors] = useState([]);
  const [Loader, setLoader] = useState(false);

  const [FileSelected, setFileSelected] = useState(false);
  const navigate = useNavigate();
  const handleAddProject = async (e) => {
    
    const formData = new FormData();
    formData.append("title", e.get("title"));
    formData.append("description", e.get("description"));
    formData.append("projectGithub", e.get("projectGithub"));
    formData.append("projectImg", e.get("projectImg"));
  
    const res = await (
      await fetch("https://ghous-projects.vercel.app/project/add-project", {
        credentials: "include",
        method: "post",
        body: formData,
      })
    ).json();
    if (!res.success) {
      if (res.messages[0] === "unAuthorized") {
        navigate("/update-portfolio");
      }
      setErrors(res.messages);
    }
    setLoader(false);

  };
  const handleAdding = () => {
    setErrors([]);
    setLoader(true);
  };
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await (
        await fetch(
          "https://ghous-projects.vercel.app/auth/check-is-verified",
          {
            credentials: "include",
            method: "post",
          },
        )
      ).json();
      if (!res.success) {
        navigate("/update-portfolio");
      }
      setLoading(false);
    })();
  }, []);
  const handleFileSelected = (e) => {

    if (e.target.files.length !== 0) {
      setFileSelected(true);
    }
  };
  if (Loading) {
    return <div className="mt-52 mx-atuo text-center">Loading...</div>;
  }
  return (
    <div>
      <Header></Header>
      <form
        action={handleAddProject}
        className="flex flex-col mt-25 gap-6 items-center"
        onSubmit={handleAdding}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter project title"
          className="sm:w-[35vw] max-sm:w-[80vw] border outline-0 border-white rounded-[10px] px-2.5 py-1.5  border-t-slate-500 shadow-2xl"
        />
        <input
          type="text"
          name="projectGithub"
          placeholder="Enter Github link"
          className="sm:w-[35vw] max-sm:w-[80vw] border outline-0 border-white rounded-[10px] px-2.5 py-1.5  border-t-slate-500 shadow-2xl"
        />
        <textarea
          name="description"
          placeholder="Enter project desrcription"
          className="sm:w-[35vw] max-sm:w-[80vw] border outline-0 border-white rounded-[10px] px-2.5 py-1.5  border-t-slate-500 shadow-2xl"
          rows={8}
        ></textarea>
        <div className="relative w-fit">
          <input
            type="file"
            size={1024 * 1024}
            name="projectImg"
            className="sm:w-[30vw] max-sm:w-[65vw] z-20 opacity-0 absolute h-[40px]"
            onInput={handleFileSelected}
          />
          <div
            className={`sm:w-[30vw] max-sm:w-[65vw] bg-green-400 rounded-[15px] text-center flex items-center justify-center text-white font-bold  h-[40px] `}
          >
            <span>Select File</span>
          </div>
        </div>
        {FileSelected ? (
          <div className="text-[12px] text-green-400">File Selected</div>
        ) : (
          <div className="text-[12px]">Select an image for adding project</div>
        )}

        <button
          type="submit"
          disabled={Loader}
          className={`${!Loader ? "bg-green-400" : "bg-green-300"} w-fit cursor-pointer hover:scale-105 transition-all duration-300 text-white font-bold px-6 py-1.5 flex justify-center  rounded-[10px] `}
        >
          {!Loader ? (
            <span>Add</span>
          ) : (
            <div className="w-[20px] h-[20px] loader border-2 border-white rounded-[50%] border-t-black "></div>
          )}
        </button>
        {Errors.length !== 0 && (
          <div>
            {Errors.map((item, idx) => {
              return (
                <div className="text-red-500 text-[12px]" key={idx}>
                  . {item}
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProjectElement;
