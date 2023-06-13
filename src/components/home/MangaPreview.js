import React, { useEffect, useState } from "react";
import { useGetMangasQuery } from "../../apiSlice";
import PreviewWrapper, { LoadingPreview } from "./PreviewWrapper";
import PropTypes from "prop-types";

const MangaPreview = (props) => {
  const [delay, setDelay] = useState(
    props.delay == undefined ? 0 : props.delay * 500
  );
  const { mangaData } = useGetMangasQuery(props.query, {
    selectFromResult: ({ data }) => ({
      mangaData: data?.entities[props.id],
    }),
    skip: delay > 0,
  });

  useEffect(() => {
    if (delay <= 0) return;
    setTimeout(() => {
      setDelay((current) => current - 500);
    }, 500);
  }, [delay]);

  if (!mangaData || delay > 0) {
    return <LoadingPreview title={mangaData.title} />;
  }

  return (
    <PreviewWrapper
      src={mangaData.coverUrl}
      title={mangaData.title}
      publicationStatus={mangaData.publicationStatus}
      id={props.id}
    />
  );
};

export default MangaPreview;

MangaPreview.propTypes = {
  id: PropTypes.string.isRequired,
  query: PropTypes.array.isRequired,
  delay: PropTypes.number,
};
