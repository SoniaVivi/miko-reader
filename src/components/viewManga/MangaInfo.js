import React from "react";
import { useSelector } from "react-redux";
const MangaInfo = () => {
  const mangaData = useSelector((state) => state.manga);

  return (
    <div className="manga-info wrapper main-background">
      <div className="manga-info">
        <img className="cover"></img>
        <div className="manga metadata">
          <h3>{mangaData.name}</h3>
          <span>{mangaData.publicationStatus}</span>
          <span>{mangaData.author}</span>
          <span>{mangaData.artist}</span>
        </div>
      </div>
      <p>{mangaData.synopsis}</p>
    </div>
  );
};

export default MangaInfo;
