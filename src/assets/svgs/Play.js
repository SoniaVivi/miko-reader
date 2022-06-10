import React from "react";
import PropTypes from "prop-types";
import HintContainer from "../../components/styled/HintContainer";

const Play = (props) => (
  <HintContainer className="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={`play icon ${props.className ?? ""}`}
      onClick={props.onClick}
      viewBox="0 0 16 16"
    >
      <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
    </svg>
    {props.children}
  </HintContainer>
);

export default Play;

Play.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
