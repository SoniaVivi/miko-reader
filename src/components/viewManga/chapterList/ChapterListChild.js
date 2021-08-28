import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { relativeTime } from "../../../dateHelpers";
import { useHistory } from "react-router-dom";

const ChapterListChild = (props) => {
  const mangaName = useSelector((state) => state.manga.name);
  const history = useHistory();
  const trimString = (str, max_length = 12) =>
    str.length <= max_length ? str : `${str.slice(0, max_length - 3)}...`;

  const timeFormatFunc = (time, units) => {
    const timeUnits = {
      0: "now",
      years: "yrs",
      months: "m",
      hours: "hrs",
      minutes: "mins",
      seconds: "s",
    };
    return time != 0 ? time + timeUnits[units] : timeUnits[units];
  };

  return (
    <li
      className="chapter-list-item hover"
      onClick={() => history.push(`/${mangaName}/${props.chapterId}/1`)}
    >
      <div>
        <span>{trimString(props.title, 20)}</span>
      </div>
      <div className="chapter-list-item metadata">
        <span className="chapter-list-item group">
          {trimString(props.group, 16)}
        </span>
        <span>{trimString(props.uploader)}</span>
        <span>
          {relativeTime(Date.parse(props.uploaded + "Z"), timeFormatFunc)}
        </span>
      </div>
    </li>
  );
};

export default ChapterListChild;

ChapterListChild.propTypes = {
  uploader: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  uploaded: PropTypes.string.isRequired,
  mangaName: PropTypes.string.isRequired,
  chapterId: PropTypes.string.isRequired,
};
