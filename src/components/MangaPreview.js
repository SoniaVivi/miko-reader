import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetMangasQuery } from "../apiSlice";
import { setActiveManga, setTitle } from "../mangaSlice";
import PropTypes from "prop-types";
import titleToUrl from "./helpers/titleToUrl";

const MangaPreview = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { mangaData } = useGetMangasQuery(props.query, {
    selectFromResult: ({ data }) => ({
      mangaData: data?.entities[props.id],
    }),
  });

  if (!mangaData) {
    return (
      <li className="manga preview">
        <img className="cover preview"></img>
        <h3>Loading...</h3>
      </li>
    );
  }

  return (
    <li className="manga preview">
      <img
        src={mangaData.coverUrl}
        className="cover preview"
        onClick={() => {
          dispatch(setActiveManga(props.id));
          dispatch(setTitle(mangaData.title));
          history.push(titleToUrl(mangaData.title));
        }}
      ></img>
      <h3 className="preview manga-title">{mangaData.title}</h3>
    </li>
  );
};

export default MangaPreview;

MangaPreview.propTypes = {
  id: PropTypes.string.isRequired,
  query: PropTypes.array.isRequired,
};
