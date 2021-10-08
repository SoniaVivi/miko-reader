import React from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import { useSelector } from "react-redux";

const ProgressBar = (props) => {
  const params = useParams();
  const history = useHistory();
  const currentlyViewing = useSelector(
    (state) => state.settings.currentlyViewing
  );
  const direction = useSelector((state) => state.settings.pageDirection);
  const chapterData = useGetCurrentChapterQuery();
  const length = chapterData?.pages?.length ?? 0;
  let current;
  if (currentlyViewing == 2) {
    current = [Number(params.page), Number(params.page) + 1];
  } else {
    current = [Number(params.page)];
  }

  return (
    <div
      className={`progression-bar${props.show ? "" : " hide"} ${direction
        .slice(2)
        .toLowerCase()}`}
    >
      {[...Array(length)].map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`${
              i + 1 < Math.min(...current)
                ? "read"
                : current.includes(i + 1)
                ? "current"
                : ""
            }`}
            onClick={() =>
              history.push(`/${params.manga}/${params.chapter}/${i + 1}`)
            }
          ></div>
          <div className="divider vertical"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  show: PropTypes.bool.isRequired,
};
