import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firstPage from "../assets/01.png";
import secondPage from "../assets/02.png";
import { toggleNav } from "../mangaSlice";
import "../stylesheets/manga/no_scroll.scss";
import ProgressBar from "./viewChapter/ProgressBar";
import Sidebar from "./viewChapter/Sidebar";

const Chapter = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const showNav = useSelector((state) => state.manga.showNav);
  const mangaPageRef = useRef();
  const dispatch = useDispatch();
  //Navbar height is 48 as of commit dff93b16005ac7fd018fbc0b14a40a1b7dfd3e45
  const revealWithin = 48;

  useEffect(() => {
    if (!mangaPageRef) return;
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

  const sidebarCheck = (e, xCoords) => {
    if (e.clientY >= revealWithin && xCoords >= -360) {
      setShowSidebar(true);
    } else if (xCoords <= -360) {
      setShowSidebar(false);
    }
  };

  const progressBarCheck = (e, xCoords) => {
    const yCoords = e.clientY - window.screen.height;
    if (yCoords >= -200 && xCoords <= -360) {
      setShowProgressBar(true);
    } else {
      setShowProgressBar(false);
    }
  };

  return (
    <React.Fragment>
      <div
        className="chapter-view flex"
        onMouseMove={(e) => {
          const xCoords = e.clientX - window.screen.width;
          navCheck(e, xCoords);
          sidebarCheck(e, xCoords);
          progressBarCheck(e, xCoords);
        }}
      >
        <div className="manga-page wrapper flex">
          <div className="manga-page flex" ref={mangaPageRef}>
            <img src={firstPage}></img>
            <img src={secondPage}></img>
          </div>
        </div>
        <Sidebar show={showSidebar} />
      </div>
      <ProgressBar length={30} current={[12, 13]} show={showProgressBar} />
    </React.Fragment>
  );
};

export default Chapter;
