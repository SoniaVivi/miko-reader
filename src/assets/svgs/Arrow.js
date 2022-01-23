import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { circle } from "../../components/styled/mixins";
import HoverButton from "../../components/styled/HoverButton";

const ArrowSvg = styled(HoverButton)`
  ${circle("25px")};

  &.left {
    transform: rotate(90deg);
  }

  &.right {
    transform: rotate(-90deg);
  }

  &.rectangle {
    border-radius: 0;
  }
`;

const Arrow = (props) => {
  return (
    <ArrowSvg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "16"}
      height={props.height ?? "16"}
      fill="currentColor"
      className={`arrow ${props.className ?? ""}`}
      viewBox="0 0 16 16"
      onClick={props.onClick ?? (() => {})}
    >
      <path
        fillRule="evenodd"
        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
      />
    </ArrowSvg>
  );
};

export default Arrow;

Arrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};
