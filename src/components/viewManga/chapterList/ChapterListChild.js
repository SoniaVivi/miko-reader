import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { relativeTime } from "../../../dateHelpers";
import useGetUserAndGroupQuery from "../../useGetUserAndGroupQuery";
import { setLanguage, setChapterId } from "../../../mangaSlice";
import TrimmedSpan from "./TrimmedSpan";

const ChapterListChild = (props) => {
  //eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { user: uploaderName, group: groupName } = useGetUserAndGroupQuery({
    user: props.uploader,
    groups: props.groups,
    group: props.group,
  });

  const timeFormatFunc = (time, units) => {
    const timeUnits = {
      0: "now",
      years: "yrs",
      months: "m",
      weeks: "w",
      days: "d",
      hours: "hrs",
      minutes: "mins",
      seconds: "s",
    };
    return time != 0 ? `${time}${timeUnits[units]}` : timeUnits[units];
  };

  return (
    <li
      className="chapter-list-item hover"
      onClick={() => {
        dispatch(setChapterId(props.chapterId));
        dispatch(setLanguage(props.language));
        history.push(`/${params.manga}/${props.chapterNumber}/1`);
      }}
    >
      <div>
        <TrimmedSpan maxLength={22} text={props.title} />
      </div>
      <div className="chapter-list-item metadata">
        <TrimmedSpan maxLength={16} text={groupName ?? props.group} />
        <TrimmedSpan text={uploaderName ?? props.uploader} />
        <span>{relativeTime(Date.parse(props.uploaded), timeFormatFunc)}</span>
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
  chapterId: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  chapterNumber: PropTypes.string.isRequired,
  groups: PropTypes.array,
};
