import React, { useMemo, useEffect, useRef, useState } from "react";
import { useGetMangasByTitleQuery } from "../../apiSlice";
import SearchResult from "./SearchResult";
import styled from "styled-components";
import { bevel } from "../styled/mixins";
import StyledInput from "../styled/StyledInput";

const Container = styled.li`
  ${bevel(24)};
  position: relative;
  width: 196px;

  &.active {
    width: 400px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: unset;

    > input {
      background-color: ${(props) => props.theme.mainBackground};
    }

    > ul,
    input {
      border-color: ${(props) => props.theme.inputFocusBorder};
    }
  }

  > input {
    padding: 0 10px;
    border: 1px solid ${(props) => props.theme.lightBorder};
  }
`;

const SearchResultsList = styled.ul`
  position: absolute;
  z-index: ${(props) => props.theme.forthLevelZIndex};
  top: 100%;
  max-height: 50vh;
  height: fit-content;
  width: 100%;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.lightBorder};
  border-top: unset;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${(props) => props.theme.mainBackground};
  overflow-y: scroll;

  &.hide {
    display: none;
  }
`;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { mangas: searchData } = useGetMangasByTitleQuery(searchQuery, {
    selectFromResult: ({ data }) => ({
      mangas: data?.entities,
    }),
    skip: !searchQuery.length,
  });
  const currentSearchString = useRef("");
  const searchStarted = useRef(false);
  useEffect(() => {
    currentSearchString.current = searchValue;
    if (!searchStarted.current && searchValue.length) {
      searchStarted.current = true;
      setTimeout(() => {
        searchStarted.current = false;
        setSearchQuery(currentSearchString.current);
      }, 500);
    }
  }, [searchValue, searchQuery]);

  const searchResults = useMemo(
    () => (searchData ? Object.keys(searchData) : []),
    [searchData]
  );

  return (
    <Container className={`nav${searchValue.length ? " active" : ""}`}>
      <Container
        as={StyledInput}
        className={searchValue.length ? "active" : null}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      ></Container>
      <SearchResultsList className={!searchValue.length ? "hide" : null}>
        {searchResults.map((id, i) => (
          <SearchResult
            key={i}
            id={id}
            queryString={searchQuery}
            onClick={() => {
              setSearchValue("");
              setSearchQuery("");
            }}
          />
        ))}
      </SearchResultsList>
    </Container>
  );
};

export default SearchBar;
