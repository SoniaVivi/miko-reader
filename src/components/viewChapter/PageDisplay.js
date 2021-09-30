import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import firstPage from "../../assets/01.png";
import secondPage from "../../assets/02.png";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import {
  useGetServerURLQuery,
  useGetMangaAggregateQuery,
} from "../../apiSlice";
import { useParams, useHistory } from "react-router";
import getImages from "./getImages";
import { useDispatch, useSelector } from "react-redux";
import { setChapterId } from "../../mangaSlice";

const PageDisplay = (props) => {
  const queryParams = useSelector((state) => ({
    mangaId: state.manga.id,
    language: state.manga.language,
  }));
  const dispatch = useDispatch();
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const loading = useRef(false);
  const [wasPrevImageLandscape, setWasPrevImageLandscape] = useState(false);
  const params = useParams();
  const history = useHistory();
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
      if (newPage + 1 <= pages.length) {
        imageUrls = [...imageUrls, getImageUrl(1)];
      }
      getImages(imageUrls).then((sizes) => {
        if (newPage > 1) {
          setWasPrevImageLandscape(sizes.shift());
        }
        const isLandscape = sizes.shift();
        setFirstImage(
          <img
            src={getImageUrl()}
            className={isLandscape ? "landscape" : ""}
          ></img>
        );
        if (isLandscape || !sizes.length) {
          setSecondImage(null);
          loading.current = false;
          return;
        }
        setSecondImage(sizes.shift() ? null : <img src={getImageUrl(1)}></img>);
        loading.current = false;
      });
    },
    [hash, pages, serverUrl]
  );

  useEffect(
    () => setImages(Number(params.page)),
    [history.location, setImages, params.page]
  );

  if (!id || !serverUrl) {
    return (
      <div className="manga-page flex">
        <img src={firstPage}></img>
        <img src={secondPage}></img>
      </div>
    );
  }

  if (firstImage == null && secondImage == null && loading.current == false) {
    setImages(Number(params.page));
  }

  const changeChapters = (action) =>
    Object.values(mangaData).forEach((volume) =>
      Object.values(volume.chapters).forEach((chapter) => {
        const current = Number(params.chapter);
        const chapterNum = Number(chapter.chapter);
        if (
          ((chapterNum < current && action == "decrement") ||
            (chapterNum > current && action == "increment")) &&
          Math.abs(chapterNum - current) <= 1
        ) {
          dispatch(setChapterId(chapter.id));
          history.push(`/${params.manga}/${chapterNum}/1`);
        }
      })
    );

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
      className="manga-page flex"
      ref={props.classRef}
      onKeyDown={(e) => {
        if (e.repeat) return;
        if (e.key == "ArrowLeft") {
          changePage("increment");
        } else if (e.key == "ArrowRight") {
          changePage("decrement");
        }
      }}
    >
      {[firstImage, secondImage]}
    </div>
  );
};

export default PageDisplay;

PageDisplay.propTypes = { classRef: PropTypes.object };
