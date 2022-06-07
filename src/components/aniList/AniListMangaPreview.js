import React from "react";
import PropTypes from "prop-types";
import { useGetMangaByTitleQuery } from "../../apiSlice";
import PreviewWrapper from "../home/PreviewWrapper";

const AniListMangaPreview = (props) => {
  const {
    id,
    title: mangadexTitle,
    coverUrl,
    publicationStatus,
  } = useGetMangaByTitleQuery(props.title, {
    selectFromResult: ({ data }) =>
      data?.entities
        ? Object.values(data?.entities)[0]
        : {
            id: null,
            title: null,
            coverUrl: null,
            publicationStatus: null,
          },

    skip: !props.title,
  });

  if (!id) {
    return null;
  }

  return (
    <PreviewWrapper
      src={coverUrl}
      title={mangadexTitle}
      id={id}
      publicationStatus={publicationStatus}
    />
  );
};

export default AniListMangaPreview;

AniListMangaPreview.propTypes = {
  title: PropTypes.string.isRequired,
};
