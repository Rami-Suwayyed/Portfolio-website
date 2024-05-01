import { useState } from "react";
import "./main.css";
import { myProjects } from "./myProjects";
import { AnimatePresence, motion } from "framer-motion";

const Main = () => {
  const [currentActive, setcurrentActive] = useState("all");
  const [Projects, setProjects] = useState(myProjects);

  const handleClick = (buttonCategory) => {
    setcurrentActive(buttonCategory);

    const newProjects = myProjects.filter((item) => {
      const ItemCategory = item.category.find((myItem) => {
        return myItem === buttonCategory;
      });

      return ItemCategory === buttonCategory;
    });

    setProjects(newProjects);
  };

  return (
    <main className="flex">
      <section className="flex  left-section">
        <button
          onClick={() => {
            setcurrentActive("all");
            setProjects(myProjects);
          }}
          className={currentActive === "all" ? "active" : null}
        >
          all projects
        </button>

        <button
          onClick={() => {
            handleClick("html");
          }}
          className={currentActive === "html" ? "active" : null}
        >
          HTML & CSS
        </button>

        <button
          onClick={() => {
            handleClick("laravel");
          }}
          className={currentActive === "laravel" ? "active" : null}
        >
          Laravel
        </button>
        <button
          onClick={() => {
            handleClick("react");
          }}
          className={currentActive === "react" ? "active" : null}
        >
          React & MUI
        </button>
        <button
          onClick={() => {
            handleClick("node");
          }}
          className={currentActive === "node" ? "active" : null}
        >
          Node & Express
        </button>
      </section>

      <section className=" flex right-section">
        <AnimatePresence>
          {Projects.map((item) => {
            return (
              <motion.article
                layout
                initial={{ transform: "scale(0.4)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ type: "spring", damping: 8, stiffness: 50 }}
                key={item.keyID}
                className="  card"
              >
                <img width={266} src={item.imgPath} alt="" />

                <div style={{ width: "266px" }} className="box">
                  <h1 className="title">{item.projectTitle}</h1>
                  <p className="sub-title">{item.projectDescription}</p>
                  <p className="sub-category">
                    {item.category.map((item, index) => {
                      return (
                        <span key={index} className="category">
                          {item}
                        </span>
                      );
                    })}
                  </p>
                  <div className="flex icons">
                    <div style={{ gap: "15px" }} className="flex">
                      {item.Link && (
                        <a
                          className="icon-link"
                          href={item.Link}
                          target={`_blank`}
                        />
                      )}
                      {item.ios && (
                        <a
                          className="icon-appleinc"
                          href={item.ios}
                          target={`_blank`}
                        />
                      )}
                      {item.android && (
                        <a
                          className="icon-googleplay"
                          href={item.android}
                          target={`_blank`}
                        />
                      )}
                      {item.github && (
                        <a
                          className="icon-github"
                          href={item.github}
                          target={`_blank`}
                        />
                      )}
                    </div>

                    <a className="link flex" href="">
                      more
                      <span
                        style={{ alignSelf: "end" }}
                        className="icon-arrow-right2"
                      ></span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Main;
