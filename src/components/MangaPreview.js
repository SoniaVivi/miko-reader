import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetMangasQuery } from "../apiSlice";
import { setActiveManga, setTitle } from "../mangaSlice";
import PropTypes from "prop-types";

const MangaPreview = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { mangaData } = useGetMangasQuery([props.id], {
    selectFromResult: ({ data }) => ({
      mangaData: data?.entities[props.id],
    }),
  });

  if (!mangaData) {
    return (
      <li>
        <img className="cover preview"></img>
        <h3>Loading...</h3>
      </li>
    );
  }

  return (
    <li>
      <img
        src={mangaData.coverUrl}
        className="cover preview"
        onClick={() => {
          dispatch(setActiveManga(props.id));
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

export default MangaPreview;

MangaPreview.propTypes = {
  id: PropTypes.string.isRequired,
};
