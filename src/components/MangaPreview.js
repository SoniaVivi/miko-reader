import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMangaAttributes } from "../mangaSlice";
import PropTypes from "prop-types";

const MangaPreview = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <li>
      <img
        src=""
        className="cover preview"
        onClick={() => {
          dispatch(
            setMangaAttributes(
              props.id,
              props.name,
              props.cover,
              props.publicationStatus,
              props.synopsis,
              props.author,
              props.artist,
              props.chapters
            )
          );
          history.push(`/${props.name}`);
        }}
      ></img>
    </li>
  );
};

export default MangaPreview;

MangaPreview.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  publicationStatus: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  chapters: PropTypes.array.isRequired,
};
