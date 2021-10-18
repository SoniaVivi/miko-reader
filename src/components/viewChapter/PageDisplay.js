import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import {
  useGetServerURLQuery,
  useGetMangaAggregateQuery,
} from "../../apiSlice";
import { useParams, useHistory } from "react-router";
import getImages from "./getImages";
import { useDispatch, useSelector } from "react-redux";
import { setChapterId } from "../../mangaSlice";
import { setCurrentlyViewing } from "../../settingsSlice";

const PageDisplay = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const queryParams = useSelector((state) => ({
    mangaId: state.manga.id,
    language: state.settings.language,
  }));
  const readingSettings = useSelector((state) => ({
    pageLayout: state.settings.pageLayout,
    currentlyViewing: state.settings.currentlyViewing,
    pageDirection: state.settings.pageDirection,
  }));
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const loading = useRef(false);
  const [wasPrevImageLandscape, setWasPrevImageLandscape] = useState(false);
  const { hash, pages, id } = useGetCurrentChapterQuery();
  const { serverUrl } = useGetServerURLQuery(id, {
    selectFromResult: ({ data }) => ({
      serverUrl: data?.baseUrl,
    }),
    skip: !id,
  });
  const { data: mangaData } = useGetMangaAggregateQuery(queryParams, {
    skip: !queryParams || queryParams.id == -1,
  });
  const setImages = useCallback(
    (newPage) => {
      loading.current = true;
      const getImageUrl = (increment = 0) =>
        [serverUrl, "data", hash, pages[newPage - 1 + increment]].join("/");
      let imageUrls = [getImageUrl()];
      // Fetch previous image to determine whether to go back 1 or 2 pages
      if (newPage > 1) {
        imageUrls = [getImageUrl(-1), ...imageUrls];
      }
      // Prefetch second image to render only if first and second images are not
      // landscape
      if (newPage + 1 <= pages.length && readingSettings.pageLayout == "dual") {
        imageUrls = [...imageUrls, getImageUrl(1)];
      }
      getImages(imageUrls).then((sizes) => {
        if (newPage > 1) setWasPrevImageLandscape(sizes.shift());

        const isLandscape = sizes.shift();
        setFirstImage(
          <img
            src={getImageUrl()}
            className={isLandscape ? "landscape" : ""}
          ></img>
        );
        if (isLandscape || !sizes.length) {
          setSecondImage(null);
          dispatch(setCurrentlyViewing(1));
        } else {
          // Returns false if portrait, true if landscape
          setSecondImage(
            sizes.shift() ? null : <img src={getImageUrl(1)}></img>
          );
          dispatch(setCurrentlyViewing(2));
        }
        loading.current = false;
      });
    },
    [hash, pages, serverUrl, readingSettings.pageLayout, dispatch]
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

  const changeChapters = (action) =>
    Object.values(mangaData)
      .reduce(
        (newArry, volume) => [...newArry, ...Object.values(volume.chapters)],
        []
      )
      .sort((a, b) => Number(a.chapter) - Number(b.chapter))
      .find((chapter) => {
        const current = Number(params.chapter);
        const chapterNum = Number(chapter.chapter);

        if (
          ((chapterNum < current && action == "decrement") ||
            (chapterNum > current && action == "increment")) &&
          Math.abs(chapterNum - current) <= 1
        ) {
          dispatch(setChapterId(chapter.id));
          history.push(`/${params.manga}/${chapterNum}/1`);
          return true;
        }
      });

  const changePage = (action) => {
    const currentPage = Number(params.page);
    let newPage;
    if (action == "increment") {
      newPage = currentPage + (secondImage == null ? 1 : 2);
    } else if (action == "decrement" && currentPage > 1) {
      newPage =
        currentPage - (wasPrevImageLandscape || currentPage == 2 ? 1 : 2);
    }
    if (!newPage || newPage <= 0) {
      changeChapters("decrement");
      return;
    } else if (newPage > pages.length) {
      changeChapters("increment");
      return;
    }
    history.push(`/${params.manga}/${params.chapter}/${newPage}`);
  };

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
    >
      {firstImage}
      {secondImage}
    </div>
  );
};

export default PageDisplay;

PageDisplay.propTypes = { classRef: PropTypes.object };
