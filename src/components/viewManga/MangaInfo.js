import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetMangasQuery, useGetAuthorQuery } from "../../apiSlice";
import Brush from "../../assets/svgs/Brush";
import Pen from "../../assets/svgs/Pen";

const MangaInfo = () => {
  const [requestAuthorData, setRequestAuthorData] = useState(false);
  const mangaId = useSelector((state) => state.manga.id);
  const { mangaData } = useGetMangasQuery([mangaId], {
    selectFromResult: ({ data }) => ({
      mangaData: data?.entities[mangaId],
      skip: !mangaId,
    }),
  });
  const nameSelector = {
    selectFromResult: ({ data }) => ({
      name: data?.data.attributes.name,
    }),
  };

  const { name: authorName } = useGetAuthorQuery(mangaData?.authorId, {
    ...nameSelector,
    skip: !requestAuthorData,
  });

  const { name: artistName } = useGetAuthorQuery(mangaData?.artistId, {
    ...nameSelector,
    skip: !requestAuthorData,
  });

  useEffect(() => {
    if (mangaData?.artistId && mangaData?.authorId && !requestAuthorData) {
      setRequestAuthorData(true);
    }
  }, [mangaData, requestAuthorData]);

  if (!mangaData) {
    return (
      <div className="manga-info wrapper main-background">
        <div className="manga-info">
          <img className="cover"></img>
          <div className="manga metadata"></div>
        </div>
        <p></p>
      </div>
    );
  }

  return (
    <div className="manga-info wrapper main-background">
      <div className="manga-info">
        <img className="cover" src={mangaData.coverUrl}></img>
        <div className="manga metadata">
          <h3>{mangaData.title}</h3>
          <span className="publication-status">
            {mangaData.publicationStatus
              ? mangaData.publicationStatus.slice(0, 1).toUpperCase() +
                mangaData.publicationStatus.slice(1)
              : ""}
          </span>
          <span className={authorName != artistName ? "center-row" : "flex"}>
            {
              <React.Fragment>
                <div className="vertical-icon-container">
                  <Pen>
                    <div className="hint">Author</div>
                  </Pen>
                  {authorName == artistName ? (
                    <Brush>
                      <div className="hint">Artist</div>
                    </Brush>
                  ) : (
                    ""
                  )}
                </div>
                {authorName}
              </React.Fragment>
            }
          </span>
          {authorName != artistName ? (
            <span className="center-row">
              {
                <React.Fragment>
                  <Brush>
                    <div className="hint">Artist</div>
                  </Brush>
                  {artistName}
                </React.Fragment>
              }
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="manga synopsis">{mangaData.synopsis}</p>
    </div>
  );
};

export default MangaInfo;
