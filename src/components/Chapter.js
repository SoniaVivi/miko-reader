import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../settingsSlice";
import useFetchMangaFromTitle from "./useFetchMangaFromTitle";
import PageDisplay from "./viewChapter/PageDisplay";
import ProgressBar from "./viewChapter/ProgressBar";
import Sidebar from "./viewChapter/Sidebar";

const Chapter = () => {
  const queryParams = useSelector((state) => ({
    id: state.manga.id,
  }));
  //eslint-disable-next-line no-unused-vars
  const fetchMangaDataIfNotPresent = useFetchMangaFromTitle();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const showNav = useSelector((state) => state.settings.showNav);
  const chapterViewRef = useRef();
  const wrapperRef = useRef();
  const mangaPageRef = useRef();
  const dispatch = useDispatch();
  //Navbar height is 48 as of commit dff93b16005ac7fd018fbc0b14a40a1b7dfd3e45
  const revealWithin = 48;

  useEffect(() => {
    const setFullHeight = (ref) => {
      if (!ref || !ref.current) return;
      let classes = ref.current.className.split(" ");

      if (!classes.includes("full-height") && !showNav) {
        classes.push("full-height");
      } else if (classes.includes("full-height") && showNav) {
        classes = classes.filter((className) => className !== "full-height");
      } else {
        return;
      }
      ref.current.className = classes.join(" ");
    };
    setFullHeight(mangaPageRef);
    setFullHeight(wrapperRef);
    setFullHeight(chapterViewRef);
  }, [showNav]);

  useEffect(() => {
    document.querySelector("body").classList.add("no-scroll");
    return () => document.querySelector("body").classList.remove("no-scroll");
  }, []);

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
        ref={chapterViewRef}
        onMouseMove={(e) => {
          const xCoords = e.clientX - window.screen.width;
          const yCoords = e.clientY - window.screen.height;
          navCheck(e, xCoords);
          setShowSidebar(e.clientY >= revealWithin && xCoords >= -360);
          setShowProgressBar(yCoords >= -200 && xCoords <= -360);
        }}
      >
        <div ref={wrapperRef} className="manga-page wrapper flex">
          <PageDisplay classRef={mangaPageRef} />
        </div>
        <Sidebar show={showSidebar} />
      </div>
      <ProgressBar show={showProgressBar} />
    </React.Fragment>
  );
};

export default Chapter;
