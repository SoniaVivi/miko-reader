import React from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Divider from "../styled/Divider";

const _containerHeight = "36px";

const Container = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  height: ${_containerHeight};
  margin-top: -${_containerHeight};
  border-top: 1px solid ${(props) => props.theme.lightBorder};
  background-color: ${(props) => props.theme.mainBackground};
  transition: all ${(props) => props.theme.navTransitionTiming};

  &.to-right {
    flex-direction: row;
  }

  &.hide {
    opacity: 0;
  }

  &.left {
    flex-direction: row-reverse;
  }
`;

const Page = styled.div`
  flex-grow: 1;
  border-radius: 0;

  &.read {
    background-color: ${(props) => props.theme.read};
  }

  &.current {
    background-color: ${(props) => props.theme.currentPage};
  }
`;

const ProgressBar = (props) => {
  const params = useParams();
  const history = useHistory();
  const currentlyViewing = useSelector(
    (state) => state.settings.currentlyViewing
  );
  const direction = useSelector((state) => state.settings.pageDirection);
  const chapterData = useGetCurrentChapterQuery();
  const length = chapterData?.pages ?? 0;
  let current;
  if (currentlyViewing == 2) {
    current = [Number(params.page), Number(params.page) + 1];
  } else {
    current = [Number(params.page)];
  }

  return (
    <Container
      className={`${props.show ? "" : " hide"} ${direction
        .slice(2)
        .toLowerCase()}`}
    >
      {[...Array(length)].map((_, i) => (
        <React.Fragment key={i}>
          <Page
            className={`${
              i + 1 < Math.min(...current)
                ? "read"
                : current.includes(i + 1)
                ? "current"
                : ""
            }`}
            onClick={() =>
              history.push(`/${params.manga}/${params.chapter}/${i + 1}`)
            }
          ></Page>
          <Divider dividerType="vertical" />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  show: PropTypes.bool.isRequired,
};
