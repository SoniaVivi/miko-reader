import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import MangaInfo from "./viewManga/MangaInfo";
import ChapterList from "./viewManga/chapterList/ChapterList";
import useFetchMangaFromTitle from "./useFetchMangaFromTitle";
import { toggleNav } from "../settingsSlice";
import styled from "styled-components";
import Container from "./styled/Container";

const MangaContainer = styled(Container)`
  display: flex;
  padding: 8px;

  > * {
    flex-basis: 50%;
    min-width: 472px;
  }

  ${(props) => props.theme.lgBreakpoint} {
    justify-content: center;
    flex-wrap: wrap;

    > :first-child {
      margin-bottom: 30px;
    }
  }
`;

const Manga = () => {
  const mangaData = useSelector((state) => state.manga);
  const nav = useSelector((state) => state.settings.showNav);
  //eslint-disable-next-line no-unused-vars
  const fetchMangaDataIfNotPresent = useFetchMangaFromTitle();
  const dispatch = useDispatch();

  useEffect(() => (nav ? null : dispatch(toggleNav())), [nav, dispatch]);
  useEffect(() => {
    mangaData.title ? (document.title = mangaData.title) : null;
    return () => (document.title = "Miko Reader");
  }, [mangaData.title]);

  if (mangaData.id == "-1") {
    return <div></div>;
  }

  return (
    <MangaContainer>
      <MangaInfo />
      <ChapterList />
    </MangaContainer>
  );
};

export default Manga;

Manga.propTypes = {
  match: PropTypes.object,
};
