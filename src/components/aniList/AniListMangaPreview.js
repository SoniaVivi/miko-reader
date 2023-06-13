import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGetMangaByTitleQuery } from "../../apiSlice";
import PreviewWrapper, { LoadingPreview } from "../home/PreviewWrapper";

const AniListMangaPreview = (props) => {
  const [delay, setDelay] = useState(
    props.delay == undefined ? 0 : props.delay * 500
  );
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

    skip: !props.title || delay > 0,
  });

  useEffect(() => {
    if (delay <= 0) return;
    setTimeout(() => {
      setDelay((current) => current - 500);
    }, 500);
  }, [delay]);

  if (!id) {
    return null;
  }

  if (delay > 0) {
    return <LoadingPreview title={props.title} />;
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
  delay: PropTypes.number,
};
