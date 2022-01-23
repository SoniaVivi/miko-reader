import React from "react";
import PropTypes from "prop-types";
import { useGetMangasByTitleQuery } from "../../apiSlice";
import { cropDate } from "../../dateHelpers";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setActiveManga, setTitle } from "../../mangaSlice";
import titleToUrl from "../helpers/titleToUrl";
import styled from "styled-components";
import MangaCover from "../styled/MangaCover";
import ColoredSpan from "../styled/ColoredSpan";
import Divider from "../styled/Divider";

const SearchResultContainer = styled.li`
  display: flex;
  flex-flow: column nowrap;

  &:not(:last-child)::after {
    content: "";
    width: 80%;
    height: 1px;
    margin: 8px auto;
    background-color: ${(props) => props.theme.darkBorder};
  }
`;

const ResultWrapper = styled.div`
  max-width: 100%;
  margin-left: 5px;
  word-wrap: break-word;
  word-break: break-all;
`;

const MetadataContainer = styled.div`
  display: flex;

  * {
    color: ${(props) => props.theme.lightText};
  }

  .divider {
    background-color: ${(props) => props.theme.lightText};
  }
`;

const SearchResult = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data: mangaData } = useGetMangasByTitleQuery(props.queryString, {
    selectFromResult: ({ data }) => ({
      data: data?.entities[props.id],
    }),
    skip: !props.queryString || !props.id,
  });

  return (
    <SearchResultContainer>
      <div
        className="flex"
        onClick={() => {
          dispatch(setActiveManga(mangaData.id));
          dispatch(setTitle(mangaData.title));
          history.push(titleToUrl(mangaData.title));
          props.onClick ? props.onClick() : "";
        }}
      >
        <MangaCover isSearch={true} src={mangaData.coverUrl}></MangaCover>
        <ResultWrapper>
          <ColoredSpan>{mangaData.title}</ColoredSpan>
          <MetadataContainer>
            <ColoredSpan>
              {cropDate(new Date(Date.parse(mangaData.attributes.createdAt)))}
            </ColoredSpan>
            <Divider dividerType="dot"></Divider>
            <ColoredSpan>
              {mangaData.publicationStatus.slice(0, 1).toUpperCase() +
                mangaData.publicationStatus.slice(1)}
            </ColoredSpan>
          </MetadataContainer>
        </ResultWrapper>
      </div>
    </SearchResultContainer>
  );
};

export default SearchResult;

SearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  queryString: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
