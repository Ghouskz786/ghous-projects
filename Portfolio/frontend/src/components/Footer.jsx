import React from "react";

const Footer = ({
  handleScrollProjects,
  handleScrollServices,
  handleScrollAboutme,
  handleScrollContactMe,
  handleScrollHome,
}) => {
  return (
    <div className=" w-full  py-5 sm:px-15  text-slate-900 ">
      <div className="flex mt-8 px-3 gap-3 max-sm:flex-col ">
        <div className="flex gap-3.5 flex-col">
          <div className="text-4xl font-bold font-sans mb-3.5  relative ">
            GHOUS<span className="font-extrabold text-red-500 ">.</span>
          </div>
          <div className="sm:w-[30vw] max-sm:w-[90vw] text-slate-500">
            I'm Muhammad Ghous, a MERN Stack Developer from Karachi, If you're
            looking for a passionate MERN Stack Developer with real project
            experience -I'd love to join your team and grow together
          </div>
          <div className="flex flex-col text-slate-500">
            <span>📧 Let's connect:</span>
            <span>ghous.kz.786@gmail.com</span>
          </div>
        </div>
        <div className="flex flex-row gap-13 sm:ml-100 self-end max-sm:justify-between max-sm:mt-7  w-full">
          <div className="flex flex-col">
            <div className="font-bold ">Company</div>
            <div className="flex flex-col items-start mt-3.5 gap-2 w-fit text-sm text-slate-500">
              <button
                onClick={handleScrollHome}
                className="hover:scale-105 duration-300 cursor-pointer"
              >
                Home
              </button>

              <button
                onClick={handleScrollContactMe}
                className="hover:scale-105 duration-300 cursor-pointer"
              >
                Contact me
              </button>
              <button
                onClick={handleScrollAboutme}
                className="hover:scale-105 duration-300 cursor-pointer"
              >
                About me
              </button>
              <button
                onClick={handleScrollServices}
                className="hover:scale-105 duration-300 cursor-pointer"
              >
                My services
              </button>
              <button
                onClick={handleScrollProjects}
                className="hover:scale-105 duration-300 cursor-pointer"
              >
                My projects
              </button>
            </div>
          </div>
          <div>
            <div className="font-bold ">Get in touch</div>
            <div className="text-slate-500">
              <div className="mt-3.5 text-sm">03032630846</div>
              <div>ghous.kz.786@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 px-6 text-center text-slate-500 border w-[70vw] mx-auto mt-11 border-white border-t-slate-300">
        &copy; All right reserved
      </div>
    </div>
  );
};

export default Footer;
