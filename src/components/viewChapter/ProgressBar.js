import React from "react";
import PropTypes from "prop-types";

const ProgressBar = (props) => {
  return (
    <div className={`progression-bar${props.show ? "" : " hide"}`}>
      {[...Array(props.length)].map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`${
              i < Math.min(...props.current)
                ? "read"
                : props.current.includes(i)
                ? "current"
                : ""
            }`}
          ></div>
          <div className="divider vertical"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  length: PropTypes.number.isRequired,
  current: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
};
