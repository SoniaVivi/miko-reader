import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import MangaInfo from "./viewManga/MangaInfo";
import ChapterList from "./viewManga/chapterList/ChapterList";
import useFetchMangaFromTitle from "./useFetchMangaFromTitle";

const Manga = () => {
  const mangaData = useSelector((state) => state.manga);
  //eslint-disable-next-line no-unused-vars
  const fetchMangaDataIfNotPresent = useFetchMangaFromTitle();

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
