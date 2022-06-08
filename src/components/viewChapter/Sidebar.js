import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Person from "../../assets/svgs/Person";
import People from "../../assets/svgs/People";
import Counter from "./Counter";
import { useHistory, useParams } from "react-router";
import { useGetMangaAggregateQuery } from "../../apiSlice";
import useGetUserAndGroupQuery from "../useGetUserAndGroupQuery";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import { setChapterId } from "../../mangaSlice";
import PageLayout from "./PageLayout";
import PageDirection from "./PageDirection";
import AniListStatus from "../aniList/AniListStatus";
import titleToUrl from "../helpers/titleToUrl";
import AnilistScore from "../aniList/AniListScore";
import styled from "styled-components";
import AniListLink from "../aniList/AniListLink";
import AniListProgressForm from "../aniList/AniListProgressForm";

const Container = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-flow: column;
  width: 360px;
  height: 100%;
  padding: 0 30px;
  padding-top: 48px;
  background-color: ${(props) => props.theme.mainBackground};
  transition: margin-right ${(props) => props.theme.navTransitionTiming};

  &.hide {
    margin-right: -360px;
  }

  > * {
    display: flex;
    margin-bottom: 15px;
  }
`;

const CounterContainer = styled.div`
  flex-wrap: wrap;
  justify-content: center;
`;

const MangaTitle = styled.h3`
  color: ${(props) => props.theme.textColor};
`;

const UploaderName = styled.span`
  margin-left: 5px;
`;

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user: uploaderData, group: groupData } = useGetCurrentChapterQuery();
  const mangaTitle = useSelector((state) => state.manga.title);
  const queryParams = useSelector((state) => ({
    mangaId: state.manga.id,
    language: state.settings.language,
  }));
  const { user: uploader, group } = useGetUserAndGroupQuery({
    user: uploaderData?.id,
    group: groupData?.id,
  });
  const params = useParams();
  const { data: mangaData } = useGetMangaAggregateQuery(queryParams, {
    skip: !queryParams || queryParams.id == -1,
  });
  const [currentVolume, setCurrentVolume] = useState(null);
  useEffect(() => {
    if (!currentVolume && mangaData) {
      setCurrentVolume(
        Object.values(mangaData).find(
          (volume) =>
            volume.chapters &&
            Object.keys(volume.chapters).includes(params.chapter)
        )
      );
    }
  }, [currentVolume, mangaData, params.chapter]);

  if (!mangaData || !currentVolume) {
    return <Container className={props.show ? "" : " hide"}></Container>;
  }

  return (
    <Container className={props.show ? "" : " hide"}>
      <MangaTitle onClick={() => history.push(titleToUrl(mangaTitle))}>
        {mangaTitle}
      </MangaTitle>
      <AnilistScore />
      <CounterContainer>
        <Counter
          data={mangaData}
          current={currentVolume.volume}
          className="volume"
          text={"Vol"}
          onChildClick={(title) => setCurrentVolume(mangaData[title])}
        />
        <Counter
          data={currentVolume.chapters}
          current={params.chapter}
          className="chapter"
          text={"Ch"}
          onChildClick={(chapterNum, id) => {
            history.push(`/${params.manga}/${chapterNum}/1`);
            dispatch(setChapterId(id));
          }}
        />
        <AniListProgressForm input="button" />
      </CounterContainer>
      <div>
        <Person />
        <UploaderName>{uploader ?? "Unknown"}</UploaderName>
      </div>
      <div>
        <People />
        <UploaderName>{group ?? "Unknown"}</UploaderName>
      </div>
      <AniListLink />
      <AniListStatus className="sidebar" />
      <PageLayout />
      <PageDirection />
    </Container>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  show: PropTypes.bool,
};
