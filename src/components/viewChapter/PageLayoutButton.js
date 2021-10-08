import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setPageLayout } from "../../settingsSlice";

const PageLayoutButton = (props) => {
  const dispatch = useDispatch();
  const layoutMode = useSelector((state) => state.settings.pageLayout);

  return (
    <button
      className={`hover${layoutMode == props.mode ? " current" : ""}`}
      onClick={() => dispatch(setPageLayout(props.mode))}
    >
      {props.mode.slice(0, 1).toUpperCase() + props.mode.slice(1)}
    </button>
  );
};

export default PageLayoutButton;

PageLayoutButton.propTypes = {
  mode: PropTypes.string.isRequired,
};
