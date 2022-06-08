import React from "react";
import Arrow from "../../assets/svgs/Arrow";
import { setPageDirection } from "../../settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { forceSize } from "../styled/mixins";

const Container = styled.div`
  width: 50%;
  height: 30px;

  .arrow.rectangle {
    ${forceSize("30px", "30px")};
    margin: 0 5px;
    border-radius: 5px;
  }
`;

const Text = styled.span`
  display: flex;
  align-items: center;
`;

const PageDirection = () => {
  const dispatch = useDispatch();
  const currentPageDirection = useSelector(
    (state) => state.settings.pageDirection
  );

  return (
    <Container>
      <Text>Left</Text>
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
      <Text>Right</Text>
    </Container>
  );
};

export default PageDirection;
