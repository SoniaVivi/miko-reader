import React from "react";
import PropTypes from "prop-types";

const ArrowDiagonal = (props) => {
  return (
    <div className="icon-container hint-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`arrow diagonal hover ${props.className ?? ""}`}
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
        />
      </svg>
      {props.children}
    </div>
  );
};

export default ArrowDiagonal;

ArrowDiagonal.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};
