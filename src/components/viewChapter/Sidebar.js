import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Person from "../../assets/svgs/Person";
import People from "../../assets/svgs/People";
import Arrow from "../../assets/svgs/Arrow";
import Counter from "./Counter";
import { useParams } from "react-router";
import { useGetMangaAggregateQuery } from "../../apiSlice";
import useGetUserAndGroupQuery from "../useGetUserAndGroupQuery";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";

const Sidebar = (props) => {
  const { user: uploaderData, group: groupData } = useGetCurrentChapterQuery();
  const queryParams = useSelector((state) => ({
    mangaId: state.manga.id,
    language: state.manga.language,
  }));
  const { user: uploader, group } = useGetUserAndGroupQuery({
    user: uploaderData?.id,
    group: groupData?.id,
  });
  const params = useParams();
  const { data: mangaData } = useGetMangaAggregateQuery(queryParams, {
    skip: !queryParams || queryParams.id == -1,
  });

  if (!mangaData) {
    return (
      <div
        className={`sidebar-container flex column${props.show ? "" : " hide"}`}
      ></div>
    );
  }

  const currentVolume = Object.values(mangaData).find(
    (volume) =>
      volume.chapters && Object.keys(volume.chapters).includes(params.chapter)
  );

  if (!currentVolume) {
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
      <h3 className="sidebar">{params.manga}</h3>
      <div className="counter-container">
        <Counter
          data={Object.keys(mangaData)}
          current={currentVolume.volume}
          className="volume"
          text={"Vol"}
        />
        <Counter
          data={Object.keys(currentVolume.chapters)}
          current={params.chapter}
          className="chapter"
          text={"Ch"}
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
      <div className="page-layout sidebar">
        <button className="hover active">Dual</button>
        <div className="divider vertical"></div>
        <button className="hover">Single</button>
      </div>
      <div className="page-mode sidebar">
        <span>Left</span>
        <Arrow className="left rectangle" width="40" height="20" />
        <span>Right</span>
      </div>
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  show: PropTypes.bool,
};
