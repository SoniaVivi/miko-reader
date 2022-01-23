import React from "react";
import { useGetMangasQuery } from "../apiSlice";
import PreviewWrapper, { LoadingPreview } from "./home/PreviewWrapper";
import PropTypes from "prop-types";

const MangaPreview = (props) => {
  const { mangaData } = useGetMangasQuery(props.query, {
    selectFromResult: ({ data }) => ({
      mangaData: data?.entities[props.id],
    }),
  });

  if (!mangaData) {
    return <LoadingPreview />;
  }

  return (
    <PreviewWrapper
      src={mangaData.coverUrl}
      title={mangaData.title}
      id={props.id}
    />
  );
};

export default MangaPreview;

MangaPreview.propTypes = {
  id: PropTypes.string.isRequired,
  query: PropTypes.array.isRequired,
};
