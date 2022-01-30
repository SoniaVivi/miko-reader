import React from "react";
import PropTypes from "prop-types";
import HintContainer from "../../components/styled/HintContainer";

const Plus = (props) => (
  <HintContainer className="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={`plus icon clickable ${props.className ?? ""}`}
      onClick={props.onClick ?? (() => {})}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
      />
    </svg>
    {props.children}
  </HintContainer>
);

export default Plus;

Plus.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
