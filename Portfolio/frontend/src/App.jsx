import "./App.css";
import Header from "./components/Header.jsx";
import Introduction from "./components/Introduction.jsx";
import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import Contact from "./components/Contact.jsx";
import PortfolioComponent from "./components/PortfolioComponent.jsx";
import ServicesComponent from "./components/ServicesComponent.jsx";
import AfterIntroduction from "./components/AfterIntroduction.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  const [ref, InView, entry] = useInView({ threshold: 1 });

  const [Projects, setProjects] = useState([]);
  const [Errors, setErrors] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [IntroInView, setIntroInView] = useState(false);
  const introRef = useRef("");
  const divRef = useRef(null);
  const aboutMeRef = useRef("");
  const servicesRef = useRef("");
  const projectRef = useRef("");
  const handleMoveToContact = () => {
    divRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    if (InView) {
      setIntroInView(true);
    } else {
      setIntroInView(false);
    }
  }, [InView]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await (
        await fetch("https://ghous-projects.vercel.app/project/get-project", {
          method: "get",
          credentials: "include",
        })
      ).json();
      if (res.success) {
        setProjects(res.projects);
      } else {
        setErrors(res.messages);
      }
      setLoading(false);
    })();
  }, []);
  const handleScrollHome = () => {
    introRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const handleScrollAboutme = () => {
    aboutMeRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollServices = () => {
    servicesRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const handleScrollProjects = () => {
    projectRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  if (Loading) {
    return <div className="mt-52 text-center">Loading...</div>;
  }
  if (Errors.length !== 0) {
    return (
      <div className="mt-52 ">
        {Errors.map((item) => {
          return <div className="text-red-500 text-center">{item}</div>;
        })}
      </div>
    );
  }
  return (
    <div className="h-[99vh] mainDiv ">
      <div className="">
        <Header
          IntroInView={IntroInView}
          handleScrollHome={handleScrollHome}
          handleScrollContactMe={handleMoveToContact}
          handleScrollAboutme={handleScrollAboutme}
          handleScrollServices={handleScrollServices}
          handleScrollProjects={handleScrollProjects}
        />
        <div ref={introRef} className=" pt-30">
          <div ref={ref}>
            <Introduction
              entry={entry}
              handleMoveToContact={handleMoveToContact}
            ></Introduction>
          </div>
        </div>
      </div>
      <div ref={aboutMeRef}>
        <AfterIntroduction></AfterIntroduction>
      </div>
      <div ref={servicesRef}>
        <ServicesComponent></ServicesComponent>
      </div>
      <div ref={projectRef}>
        <PortfolioComponent Projects={Projects}></PortfolioComponent>
      </div>
      <div ref={divRef}>
        <Contact></Contact>
      </div>
      <div>
        <Footer
          handleScrollHome={handleScrollHome}
          handleScrollContactMe={handleMoveToContact}
          handleScrollAboutme={handleScrollAboutme}
          handleScrollServices={handleScrollServices}
          handleScrollProjects={handleScrollProjects}
        ></Footer>
      </div>
    </div>
  );
}

export default App;
