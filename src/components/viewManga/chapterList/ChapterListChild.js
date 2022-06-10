import React from "react";
import PropTypes from "prop-types";
import { relativeTime } from "../../../dateHelpers";
import useGetUserAndGroupQuery from "../../useGetUserAndGroupQuery";
import TrimmedSpan from "./TrimmedSpan";
import HoverButton from "../../styled/HoverButton";
import styled from "styled-components";
import useSetMangaChapter from "./useSetMangaChapter";

const _baseCss = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

const Container = styled(HoverButton)`
  ${_baseCss}
  flex-flow: row wrap;
  min-height: 30px;
  padding: 0 4px;

  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 1px;
    margin: 4px auto;
    background-color: ${(props) => props.theme.lightBorder};
  }
`;

const MetadataContainer = styled.div`
  ${_baseCss}
  flex-basis: 60%;
  > * {
    display: flex;
    align-items: center;

    &:first-child::after {
      content: "";
      display: inline-block;
      width: 1px;
      height: 50%;
      margin: 0 8px;
      margin-top: 3px;
      background-color: #000000;
    }

    &:nth-child(2) {
      margin-right: 12px;
    }
  }
`;

const TitleText = styled.div`
  flex-basis: 40%;
`;

const ChapterListChild = (props) => {
  const { user: uploaderName, group: groupName } = useGetUserAndGroupQuery({
    user: props.uploader,
    groups: props.groups,
    group: props.group,
  });
  const setMangaChapter = useSetMangaChapter();

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
    <Container
      as="li"
      onClick={() =>
        setMangaChapter({
          chapterId: props.chapterId,
          language: props.language,
          chapterNumber: props.chapterNumber,
        })
      }
    >
      <TitleText>
        <TrimmedSpan maxLength={22} text={props.title} />
      </TitleText>
      <MetadataContainer>
        <TrimmedSpan text={groupName ?? props.group} />
        <TrimmedSpan text={uploaderName ?? props.uploader} />
        <span>{relativeTime(Date.parse(props.uploaded), timeFormatFunc)}</span>
      </MetadataContainer>
    </Container>
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
