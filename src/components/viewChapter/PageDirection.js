import React from "react";
import Arrow from "../../assets/svgs/Arrow";
import { setPageDirection } from "../../settingsSlice";
import { useDispatch, useSelector } from "react-redux";

const PageDirection = () => {
  const dispatch = useDispatch();
  const currentPageDirection = useSelector(
    (state) => state.settings.pageDirection
  );

  return (
    <div className="page-mode sidebar">
      <span>Left</span>
      <Arrow
        className={`rectangle ${currentPageDirection.slice(2).toLowerCase()}`}
        onClick={() =>
          dispatch(
            setPageDirection(
              currentPageDirection == "toLeft" ? "toRight" : "toLeft"
            )
          )
        }
        width="40"
        height="20"
      />
      <span>Right</span>
    </div>
  );
};

export default PageDirection;
