import React from "react";
import PropTypes from "prop-types";
import Arrow from "./Arrow";

const ArrowContainer = (props) => (
  <div className={`chapter-list arrow-container ${props.className ?? ""}`}>
    <Arrow className="left" onClick={props.onLeftArrowClick ?? (() => {})} />
    {props.children || ""}
    <Arrow className="right" onClick={props.onRightArrowClick ?? (() => {})} />
  </div>
);

export default ArrowContainer;

ArrowContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onLeftArrowClick: PropTypes.func,
  onRightArrowClick: PropTypes.func,
};
