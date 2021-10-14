import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetMangaByTitleQuery } from "../apiSlice";
import { setActiveManga, setTitle } from "../mangaSlice";
import PropTypes from "prop-types";

const AniListMangaPreview = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { mangaData } = useGetMangaByTitleQuery(props.title, {
    selectFromResult: ({ data }) => ({
      mangaData: data?.entities ? Object.values(data?.entities)[0] : null,
    }),
    skip: !props.title,
  });

  if (!mangaData) {
    return null;
  }

  return (
    <li className="manga preview">
      <img
        src={mangaData.coverUrl}
        className="cover preview"
        onClick={() => {
          dispatch(setActiveManga(mangaData.id));
          dispatch(setTitle(mangaData.title));
          history.push(
            `/${mangaData.title
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/[^\w-]+/g, "")}`
          );
        }}
      ></img>
      <h3 className="preview manga-title">{mangaData.title}</h3>
    </li>
  );
};

export default AniListMangaPreview;

AniListMangaPreview.propTypes = {
  title: PropTypes.string.isRequired,
};
