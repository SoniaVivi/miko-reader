import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetChaptersQuery } from "../../../apiSlice";
import ChapterListChild from "./ChapterListChild";
import ArrowContainer from "./ArrowContainer";
import { pageMenu } from "./pageMenu";
import PageCounterChild from "./PageCounterChild";
import styled from "styled-components";
import HoverButton from "../../styled/HoverButton";
import { bevel, center } from "../../styled/mixins";
import StartFromLastChapterButton from "./StartFromLastChapterButton";

const _languageButtonHeight = "60%";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  min-height: 453px;
  margin-left: 30px;
  padding: 8px;
  background-color: ${(props) => props.theme.mainBackground};

  ${(props) => props.theme.lgBreakpoint} {
    margin-left: 0;
  }
`;

const ListWrapper = styled.ul`
  flex-grow: 1;
  width: 100%;
`;

const LanguageList = styled.ul`
  display: flex;
  align-items: center;

  .current {
    font-weight: 700;
    font-family: "Lato Bold";

    &:not(:hover) {
      background-color: unset;
    }
  }
`;

const LanguageButtonContainer = styled.li`
  display: flex;
  align-items: center;
  height: 100%;

  &:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 1px;
    min-height: ${_languageButtonHeight};
    max-height: ${_languageButtonHeight};
    margin: auto 4px;
    background-color: ${(props) => props.theme.lightBorder};
  }
`;

const LanguageButton = styled(HoverButton)`
  padding: 2px 4px;
  font-size: 16px;
`;

const PageCounter = styled.div`
  color: ${(props) => props.theme.textColor};
`;

const MangaFetchContainer = styled.div`
  display: flex;
  height: 32px;
  margin: auto 0;
  margin-bottom: 5px;
`;

const FetchButton = styled(HoverButton)`
  ${center}
  ${bevel("32")};
  padding: 8px;
  padding-bottom: 12px;
`;

const ChapterList = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(2 ** 32);
  const mangaId = useSelector((state) => state.manga.id);
  const [requestChapters, setRequestChapters] = useState(false);
  const { chapters: chapterData } = useGetChaptersQuery(
    { mangaId, offset },
    {
      selectFromResult: ({ data }) => ({
        chapters: data?.entities,
      }),
      skip: !requestChapters,
    }
  );
  const chapters = useMemo(
    () =>
      chapterData
        ? Object.values(chapterData)
            .filter((chapter) => chapter.language == selectedLanguage)
            .sort((a, b) => Number(a.chapterNumber) < Number(b.chapterNumber))
        : [],
    [chapterData, selectedLanguage]
  );
  const languages = useMemo(
    () =>
      chapterData
        ? Object.values(chapterData)
            .map((chapter) => chapter.language)
            .filter((x, i, a) => a.indexOf(x) == i)
        : [],
    [chapterData]
  );
  const groups = useMemo(
    () =>
      chapterData
        ? Object.values(chapterData)
            .map((chapter) => chapter.group?.id)
            .filter((x, i, a) => a.indexOf(x) == i)
            .filter((a) => a !== undefined)
        : undefined,
    [chapterData]
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [currentChapters, setCurrentChapters] = useState([]);
  const totalPages = chapters ? Math.ceil((chapters.length + 1) / 12) : 0;
  const decrementPage = () =>
    setCurrentPage((current) => (current != 0 ? current - 1 : current));
  const incrementPage = () =>
    setCurrentPage((current) =>
      current != totalPages - 1 ? current + 1 : current
    );
  const resetPage = () => setCurrentPage(0);

  useEffect(() => {
    if (chapters.length > 0) {
      let lowerLimit = currentPage * 12;
      lowerLimit = currentPage == totalPages - 1 ? lowerLimit - 1 : lowerLimit;
      setCurrentChapters(chapters.slice(lowerLimit, currentPage * 12 + 11));
    }
  }, [currentPage, chapters, totalPages]);

  useEffect(() => {
    setRequestChapters(true);
    setMaxOffset(2 ** 32);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId]);

  useEffect(
    () => (currentPage ? setCurrentPage(0) : ""),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [mangaId]
  );

  if (!languages.length) {
    if (offset != 0) {
      setMaxOffset(offset);
      setOffset((prev) => prev - 96);
    }
  }

  if (!chapterData) {
    return <Container></Container>;
  }

  return (
    <Container>
      <LanguageList>
        {[...languages]
          .sort((a, b) => a.localeCompare(b))
          .map((language, i) => (
            <LanguageButtonContainer
              key={i}
              className="languages manga"
              onClick={() => {
                resetPage();
                setSelectedLanguage(language);
              }}
            >
              <LanguageButton
                className={language == selectedLanguage ? " current" : null}
              >
                {language.slice(0, 1).toUpperCase() + language.slice(1)}
              </LanguageButton>
            </LanguageButtonContainer>
          ))}
      </LanguageList>
      <StartFromLastChapterButton chapters={chapters} />
      <ArrowContainer
        top={true}
        onLeftArrowClick={decrementPage}
        onRightArrowClick={incrementPage}
      >
        <PageCounter className="no-select">
          Page {currentPage + 1} of {totalPages}
        </PageCounter>
      </ArrowContainer>
      <ListWrapper>
        {currentChapters.map((chapterData, i) => (
          <ChapterListChild
            key={i}
            chapterId={chapterData.id}
            group={chapterData.group?.id || "Unknown"}
            uploader={chapterData.uploader?.id}
            title={chapterData.title ?? "Untitled"}
            uploaded={chapterData.uploaded}
            groups={groups}
            language={chapterData?.language}
            chapterNumber={chapterData?.chapterNumber}
          />
        ))}
      </ListWrapper>
      <MangaFetchContainer>
        {offset != 0 ? (
          <FetchButton
            onClick={() => {
              resetPage();
              setOffset((prev) => prev - 96);
            }}
          >
            Go Back
          </FetchButton>
        ) : (
          ""
        )}
        {offset + 96 < maxOffset && currentPage == totalPages - 1 ? (
          <FetchButton
            onClick={() => {
              resetPage();
              setOffset((prev) => prev + 96);
            }}
          >
            Look for more Chapters
          </FetchButton>
        ) : (
          ""
        )}
      </MangaFetchContainer>
      <ArrowContainer
        className="align-btm"
        onLeftArrowClick={decrementPage}
        onRightArrowClick={incrementPage}
      >
        {pageMenu(totalPages, currentPage + 1).map((pageNum, i) => (
          <PageCounterChild
            key={i}
            pageNum={pageNum}
            currentPage={currentPage + 1}
            setCurrentPage={setCurrentPage}
          />
        ))}
      </ArrowContainer>
    </Container>
  );
};

export default ChapterList;
