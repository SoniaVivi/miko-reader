import React from "react";
import PropTypes from "prop-types";
import MangaShowcase from "./MangaShowcase";
import AniListMangaPreview from "../aniList/AniListMangaPreview";
import useMangaList from "../aniList/useMangaList";

const HomeList = (props) => {
  const { mangaTitles } = useMangaList(props.listType);

  return (
    <section>
      <MangaShowcase>
        {mangaTitles.map((title) => (
          <AniListMangaPreview title={title} key={title} />
        ))}
      </MangaShowcase>
    </section>
  );
};

export default HomeList;

HomeList.propTypes = {
  listType: PropTypes.oneOf([
    "current",
    "planning",
    "dropped",
    "completed",
    "paused",
    "repeating",
  ]).isRequired,
};
