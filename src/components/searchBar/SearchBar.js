import React, { useMemo, useEffect, useRef, useState } from "react";
import { useGetMangasByTitleQuery } from "../../apiSlice";
import SearchResult from "./SearchResult";

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
    <li className={`nav nav-search${searchValue.length ? " active" : ""}`}>
      <input
        className={`nav-search${searchValue.length ? " active" : ""}`}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      ></input>
      <ul className={`search${!searchValue.length ? " hide" : ""}`}>
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
      </ul>
    </li>
  );
};

export default SearchBar;
