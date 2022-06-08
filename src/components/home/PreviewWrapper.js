import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setActiveManga, setTitle } from "../../mangaSlice";
import titleToUrl from "../helpers/titleToUrl";
import styled from "styled-components";
import MangaCover from "../styled/MangaCover";

const Container = styled.li`
  margin-right: 10px;
  margin-bottom: 25px;
`;

const Title = styled.h3`
  max-width: ${(props) => props.theme.coverWidth};
  color: ${(props) => props.theme.textColor};
`;

const FadedSpan = styled.span`
  opacity: 0.6;
`;

const MangaStatus = styled(FadedSpan)`
  font-weight: 600;
  opacity: 0.6;
`;

const PreviewWrapper = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const viewManga = () => {
    dispatch(setActiveManga(props.id));
    dispatch(setTitle(props.title));
    history.push(titleToUrl(props.title));
  };

  return (
    <Container>
      <MangaCover
        src={props.src}
        className="cover preview clickable no-select"
        onClick={viewManga}
      ></MangaCover>
      <Title className="clickable" onClick={viewManga}>
        {props.title}
      </Title>
      <div>
        <FadedSpan className="no-select">Publication: </FadedSpan>
        <MangaStatus className="no-select">
          {props.publicationStatus.slice(0, 1).toUpperCase() +
            props.publicationStatus.slice(1).toLowerCase()}
        </MangaStatus>
      </div>
    </Container>
  );
};

export const LoadingPreview = () => {
  return (
    <Container>
      <MangaCover></MangaCover>
      <Title>Loading...</Title>
    </Container>
  );
};

export default PreviewWrapper;

PreviewWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publicationStatus: PropTypes.string.isRequired,
};
