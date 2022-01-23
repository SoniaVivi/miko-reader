import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { center, forceSize } from "../../styled/mixins";
import HoverButton from "../../styled/HoverButton";

const Placeholder = styled.div`
  ${center}
  min-width: 20px;
  user-select: none;
`;

const PageButton = styled(HoverButton)`
  ${forceSize("20px", "20px")}
  ${center};
  font-weight: 300;

  &.current {
    font-weight: 700;
    font-family: "Lato Bold";

    &:not(:hover) {
      background-color: unset;
    }
  }
`;

const PageCounterChild = (props) => {
  if (props.pageNum == "...") {
    return <Placeholder>...</Placeholder>;
  }

  return (
    <PageButton
      onClick={(e) => props.setCurrentPage(e.target.textContent - 1)}
      className={props.pageNum == props.currentPage ? " current" : null}
    >
      {props.pageNum}
    </PageButton>
  );
};

export default PageCounterChild;

PageCounterChild.propTypes = {
  pageNum: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
