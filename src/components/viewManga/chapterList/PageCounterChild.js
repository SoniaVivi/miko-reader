import React from "react";
import PropTypes from "prop-types";

const PageCounterChild = (props) => {
  if (props.pageNum != "...") {
    return (
      <button
        // key={i}
        onClick={(e) => props.setCurrentPage(e.target.textContent - 1)}
        className={`hover chapter-list${
          props.pageNum == props.currentPage ? " current" : ""
        }`}
      >
        {props.pageNum}
      </button>
    );
  }
  return <div className="dot-placeholder">...</div>;
};

export default PageCounterChild;

PageCounterChild.propTypes = {
  // key: PropTypes.
  pageNum: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
