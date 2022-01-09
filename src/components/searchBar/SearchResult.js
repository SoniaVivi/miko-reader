import React from "react";
import PropTypes from "prop-types";
import { useGetMangasByTitleQuery } from "../../apiSlice";
import { cropDate } from "../../dateHelpers";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setActiveManga, setTitle } from "../../mangaSlice";
import titleToUrl from "../helpers/titleToUrl";

const SearchResult = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data: mangaData } = useGetMangasByTitleQuery(props.queryString, {
    selectFromResult: ({ data }) => ({
      data: data?.entities[props.id],
    }),
    skip: !props.queryString || !props.id,
  });

  return (
    <li className="search result">
      <div
        className="search result wrapper"
        onClick={() => {
          dispatch(setActiveManga(mangaData.id));
          dispatch(setTitle(mangaData.title));
          history.push(titleToUrl(mangaData.title));
          props.onClick ? props.onClick() : "";
        }}
      >
        <img className="search cover" src={mangaData.coverUrl}></img>
        <div className="search wrapper">
          <span className="search manga-title">{mangaData.title}</span>
          <div className="search manga-metadata">
            <span>
              {cropDate(new Date(Date.parse(mangaData.attributes.createdAt)))}
            </span>
            <div className="dot divider"></div>
            <span>
              {mangaData.publicationStatus.slice(0, 1).toUpperCase() +
                mangaData.publicationStatus.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchResult;

SearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  queryString: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
