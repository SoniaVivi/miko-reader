import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetServerURLQuery } from "../../apiSlice";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import precachePages from "./precachePages";
import getImages from "./getImages";
import { setCurrentlyViewing } from "../../settingsSlice";

const useRetrieveImages = () => {
  const dispatch = useDispatch();
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [cachePages, setCachePages] = useState(true);
  const loading = useRef(false);
  const { id } = useGetCurrentChapterQuery();
  const readingSettings = useSelector((state) => ({
    pageLayout: state.settings.pageLayout,
    currentlyViewing: state.settings.currentlyViewing,
  }));
  //eslint-disable-next-line
  const { serverUrl, pages, hash } = useGetServerURLQuery(id, {
    selectFromResult: ({ data }) => ({
      serverUrl: data?.baseUrl,
      pages: data?.pages,
      hash: data?.hash,
    }),
    skip: !id,
  });
  const [wasPrevImageLandscape, setWasPrevImageLandscape] = useState(false);

  const setImages = useCallback(
    (newPage) => {
      if (!pages) {
        return;
      }
      loading.current = true;
      const getImageUrl = (increment = 0) =>
        [serverUrl, "data", hash, pages[newPage - 1 + increment]].join("/");

      if (cachePages && serverUrl && hash) {
        setCachePages(false);
        precachePages(newPage, pages.length, (page) =>
          [serverUrl, "data", hash, pages[page]].join("/")
        );
      }

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
    [hash, pages, serverUrl, readingSettings.pageLayout, dispatch, cachePages]
  );
  return {
    firstImage,
    secondImage,
    setImages,
    isPrevImageLandscape: wasPrevImageLandscape,
    recachePages: () => setCachePages(true),
    loading: loading,
  };
};

export default useRetrieveImages;
