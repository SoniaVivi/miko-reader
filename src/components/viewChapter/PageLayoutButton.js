import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setPageLayout } from "../../settingsSlice";
import styled from "styled-components";
import HoverButton from "../styled/HoverButton";

const _dualModeStyles = `
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: unset;
`;
const _singleModeStyles = `
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: unset;
`;

const PageButton = styled(HoverButton)`
  width: 50%;
  border: 1px solid ${(props) => props.theme.lightBorder};
  ${(props) => (props.mode == "dual" ? _dualModeStyles : _singleModeStyles)}

  &.current {
    background-color: ${(props) => props.theme.current};
  }
`;

const PageLayoutButton = (props) => {
  const dispatch = useDispatch();
  const layoutMode = useSelector((state) => state.settings.pageLayout);

  return (
    <PageButton
      className={layoutMode == props.mode ? " current" : null}
      mode={props.mode}
      onClick={() => dispatch(setPageLayout(props.mode))}
    >
      {props.mode.slice(0, 1).toUpperCase() + props.mode.slice(1)}
    </PageButton>
  );
};

export default PageLayoutButton;

PageLayoutButton.propTypes = {
  mode: PropTypes.string.isRequired,
};
