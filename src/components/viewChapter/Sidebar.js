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
    return (
      <div
        className={`sidebar-container flex column${props.show ? "" : " hide"}`}
      ></div>
    );
  }

  return (
    <div
      className={`sidebar-container flex column${props.show ? "" : " hide"}`}
    >
      <h3 className="sidebar">{mangaTitle}</h3>
      <div className="counter-container">
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
      </div>
      <div className="upload sidebar">
        <Person />
        <span>{uploader ?? "Unknown"}</span>
      </div>
      <div className="upload sidebar">
        <People />
        <span>{group ?? "Unknown"}</span>
      </div>
      <PageLayout />
      <PageDirection />
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  show: PropTypes.bool,
};
