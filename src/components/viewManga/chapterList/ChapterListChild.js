import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { relativeTime } from "../../../dateHelpers";
import { useGetUserQuery, useGetGroupsQuery } from "../../../apiSlice";
import TrimmedSpan from "./TrimmedSpan";

const ChapterListChild = (props) => {
  //eslint-disable-next-line no-unused-vars
  const mangaName = useSelector((state) => state.manga.name);
  //eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const { name: uploaderName } = useGetUserQuery(props.uploader, {
    selectFromResult: ({ data }) => ({
      name: data?.data.attributes.username,
    }),
    skip: !props.uploader,
  });
  const { name: groupName } = useGetGroupsQuery(props.groups, {
    selectFromResult: ({ data }) => ({
      name: data?.entities[props.group].attributes?.name,
    }),
    skip: !props.groups,
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
      // onClick={() => history.push(`/${mangaName}/${props.chapterId}/1`)}
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
  groups: PropTypes.array,
};
