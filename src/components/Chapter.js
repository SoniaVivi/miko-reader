import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../mangaSlice";
import "../stylesheets/manga/no_scroll.scss";
import PageDisplay from "./viewChapter/PageDisplay";
import ProgressBar from "./viewChapter/ProgressBar";
import Sidebar from "./viewChapter/Sidebar";

const Chapter = () => {
  const queryParams = useSelector((state) => ({
    id: state.manga.id,
  }));
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const showNav = useSelector((state) => state.manga.showNav);
  const mangaPageRef = useRef();
  const dispatch = useDispatch();
  //Navbar height is 48 as of commit dff93b16005ac7fd018fbc0b14a40a1b7dfd3e45
  const revealWithin = 48;

  useEffect(() => {
    if (!mangaPageRef || !mangaPageRef.current) return;
    let classes = mangaPageRef.current.className.split(" ");

    if (!classes.includes("full-height") && !showNav) {
      classes.push("full-height");
    } else if (classes.includes("full-height") && showNav) {
      classes = classes.filter((className) => className !== "full-height");
    } else {
      return;
    }
    mangaPageRef.current.className = classes.join(" ");
  }, [showNav]);

  const navCheck = (e, xCoords) => {
    if (
      ((e.clientY <= revealWithin && !showNav) ||
        (e.clientY > revealWithin && showNav)) &&
      xCoords <= -360
    ) {
      dispatch(toggleNav());
    }
  };

  if (!queryParams || queryParams.id == -1) {
    return <div className="chapter-view flex"></div>;
  }

  return (
    <React.Fragment>
      <div
        className="chapter-view flex"
        onMouseMove={(e) => {
          const xCoords = e.clientX - window.screen.width;
          const yCoords = e.clientY - window.screen.height;
          navCheck(e, xCoords);
          setShowSidebar(e.clientY >= revealWithin && xCoords >= -360);
          setShowProgressBar(yCoords >= -200 && xCoords <= -360);
        }}
      >
        <div className="manga-page wrapper flex">
          <PageDisplay classRef={mangaPageRef} />
        </div>
        <Sidebar show={showSidebar} />
      </div>
      <ProgressBar show={showProgressBar} />
    </React.Fragment>
  );
};

export default Chapter;
