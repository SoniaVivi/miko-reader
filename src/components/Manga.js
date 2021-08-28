import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import MangaInfo from "./viewManga/MangaInfo";
import ChapterList from "./viewManga/chapterList/ChapterList";

const Manga = () => {
  const mangaData = useSelector((state) => state.manga);

  if (mangaData.id == "-1") {
    return (
      <div>
        {`Show Loading screen => Fetch data from the API => if manga not found go
        to homepage else show the next part`}
      </div>
    );
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
