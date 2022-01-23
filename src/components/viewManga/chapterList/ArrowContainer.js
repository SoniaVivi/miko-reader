import React from "react";
import PropTypes from "prop-types";
import Arrow from "../../../assets/svgs/Arrow";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 200px;
  width: 100%;
  margin: 0 auto;
  color: ${(props) => props.theme.textColor};

  &.align-btm {
    justify-content: center;
    max-width: 100%;
    margin-top: auto;
  }
`;

const ArrowContainer = (props) => (
  <Container className={props.className ?? ""}>
    <Arrow className="left" onClick={props.onLeftArrowClick ?? (() => {})} />
    {props.children || ""}
    <Arrow className="right" onClick={props.onRightArrowClick ?? (() => {})} />
  </Container>
);

export default ArrowContainer;

ArrowContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onLeftArrowClick: PropTypes.func,
  onRightArrowClick: PropTypes.func,
};
