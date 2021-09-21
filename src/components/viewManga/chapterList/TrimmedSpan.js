import React from "react";
import PropTypes from "prop-types";

const TrimmedSpan = (props) => {
  const maxLength = props.maxLength ?? 12;
  const trimString = (str) => {
    if (!str) {
      return "";
    } else if (str.length <= maxLength) {
      return str;
    }
    return `${str.slice(0, maxLength - 3)}...`;
  };

  return (
    <span className={`hint-container ${props.className ?? ""}`}>
      {trimString(props.text)}
      {props.text && props.text.length > maxLength ? (
        <span className="hint">{props.text}</span>
      ) : (
        ""
      )}
    </span>
  );
};

export default TrimmedSpan;

TrimmedSpan.propTypes = {
  text: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};
