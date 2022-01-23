import React from "react";
import PropTypes from "prop-types";
import { useGetMangaByTitleQuery } from "../../apiSlice";
import PreviewWrapper from "../home/PreviewWrapper";

const AniListMangaPreview = (props) => {
  const {
    id,
    title: mangadexTitle,
    coverUrl,
  } = useGetMangaByTitleQuery(props.title, {
    selectFromResult: ({ data }) =>
      data?.entities
        ? Object.values(data?.entities)[0]
        : { id: null, title: null, coverUrl: null },

    skip: !props.title,
  });

  if (!id) {
    return null;
  }

  return <PreviewWrapper src={coverUrl} title={mangadexTitle} id={id} />;
};

export default AniListMangaPreview;

AniListMangaPreview.propTypes = {
  title: PropTypes.string.isRequired,
};
