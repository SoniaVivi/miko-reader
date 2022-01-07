import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import MangaInfo from "./viewManga/MangaInfo";
import ChapterList from "./viewManga/chapterList/ChapterList";
import useFetchMangaFromTitle from "./useFetchMangaFromTitle";
import { toggleNav } from "../settingsSlice";

const Manga = () => {
  const mangaData = useSelector((state) => state.manga);
  const nav = useSelector((state) => state.settings.showNav);
  //eslint-disable-next-line no-unused-vars
  const fetchMangaDataIfNotPresent = useFetchMangaFromTitle();
  const dispatch = useDispatch();

  useEffect(() => (nav ? null : dispatch(toggleNav())), [nav, dispatch]);

  if (mangaData.id == "-1") {
    return <div></div>;
  }

  return (
    <div className="container manga">
      <MangaInfo />
      <ChapterList />
    </div>
  );
};

export default Manga;

Manga.propTypes = {
  match: PropTypes.object,
};
