import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetMangasQuery } from "../apiSlice";
import { setActiveManga } from "../mangaSlice";
import PropTypes from "prop-types";

const MangaPreview = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { mangaData } = useGetMangasQuery([props.id], {
    selectFromResult: ({ data }) => ({
      mangaData: data.entities[props.id],
    }),
  });

  return (
    <li>
      <img
        src={mangaData.coverUrl}
        className="cover preview"
        onClick={() => {
          dispatch(setActiveManga(props.id));
          history.push(`/${mangaData.title.replace(/\s/g, "_")}`);
        }}
      ></img>
      <h3>{mangaData.title}</h3>
    </li>
  );
};

export default MangaPreview;

MangaPreview.propTypes = {
  id: PropTypes.string.isRequired,
};
