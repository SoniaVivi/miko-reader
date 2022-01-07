import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import { useGetServerURLQuery } from "../../apiSlice";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import useRetrieveImages from "./useRetrieveImages";
import useChangePage from "./useChangePage";

const PageDisplay = (props) => {
  const params = useParams();
  const history = useHistory();
  const readingSettings = useSelector((state) => ({
    pageLayout: state.settings.pageLayout,
    currentlyViewing: state.settings.currentlyViewing,
    pageDirection: state.settings.pageDirection,
  }));
  const timeoutId = useRef(null);
  const { id } = useGetCurrentChapterQuery();
  const { serverUrl } = useGetServerURLQuery(id, {
    selectFromResult: ({ data }) => ({
      serverUrl: data?.baseUrl,
    }),
    skip: !id,
  });
  const {
    firstImage,
    secondImage,
    setImages,
    isPrevImageLandscape: wasPrevImageLandscape,
    recachePages,
    loading,
  } = useRetrieveImages();
  const changePage = useChangePage(
    recachePages,
    secondImage,
    wasPrevImageLandscape
  );

  useEffect(
    () => setImages(Number(params.page)),
    [history.location, setImages, params.page]
  );

  if (!id || !serverUrl || !readingSettings) {
    return (
      <div className="manga-page flex">
        <img></img>
        <img></img>
      </div>
    );
  }

  if (firstImage == null && secondImage == null && loading.current == false) {
    setImages(Number(params.page));
  }
  return (
    <div
      tabIndex="-1"
      className={`manga-page flex ${readingSettings.pageDirection
        .slice(2)
        .toLowerCase()}`}
      ref={props.classRef}
      onKeyDown={(e) => {
        if (e.repeat) return;
        else if (e.key == "ArrowLeft") {
          changePage(
            readingSettings.pageDirection == "toLeft"
              ? "increment"
              : "decrement"
          );
        } else if (e.key == "ArrowRight") {
          changePage(
            readingSettings.pageDirection == "toLeft"
              ? "decrement"
              : "increment"
          );
        }
      }}
      onMouseMove={() => {
        if (timeoutId.current) {
          props.classRef.current.className = props.classRef.current.className
            .split(" ")
            .filter((className) => className !== "no-cursor")
            .join(" ");
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
          if (props.classRef?.current) {
            props.classRef.current.className += " no-cursor";
          }
        }, 2000);
      }}
    >
      {firstImage}
      {secondImage}
    </div>
  );
};

export default PageDisplay;

PageDisplay.propTypes = { classRef: PropTypes.object };
