import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import { useGetServerURLQuery } from "../../apiSlice";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import useRetrieveImages from "./useRetrieveImages";
import useChangePage from "./useChangePage";
import PageBase from "./PageBase";

const circleThickness = "5px";

const LoadingScreen = styled.div`
  position: absolute;
  z-index: ${(props) => props.theme.thirdLevelZIndex};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-top: ${circleThickness} solid ${(props) => props.theme.bodyBackground};
  border-left: ${circleThickness} solid ${(props) => props.theme.textColor};
  border-bottom: ${circleThickness} solid ${(props) =>
  props.theme.bodyBackground};
  animation-iteration-count: infinite;
  animation-duration: 1.5s;
  animation-name: spin;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
`;

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
      <PageBase>
        <img></img>
        <img></img>
      </PageBase>
    );
  }

  if (firstImage == null && secondImage == null && loading == false) {
    setImages(Number(params.page));
  }
  return (
    <PageBase
      tabIndex="-1"
      className={readingSettings.pageDirection.slice(2).toLowerCase()}
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
      {loading ? (
        <LoadingScreen>
          <Circle />
        </LoadingScreen>
      ) : (
        [firstImage, secondImage]
      )}
    </PageBase>
  );
};

export default PageDisplay;

PageDisplay.propTypes = { classRef: PropTypes.object };
