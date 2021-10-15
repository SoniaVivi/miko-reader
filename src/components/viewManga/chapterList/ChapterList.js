import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetChaptersQuery } from "../../../apiSlice";
import ChapterListChild from "./ChapterListChild";
import ArrowContainer from "./ArrowContainer";
import { pageMenu } from "./pageMenu";
import PageCounterChild from "./PageCounterChild";

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

  useEffect(
    () => (mangaId && !requestChapters ? setRequestChapters(true) : ""),
    [mangaId, requestChapters]
  );

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
    return <div className="chapter-list main-background"></div>;
  }

  return (
    <div className="chapter-list main-background">
      <ul className="languages-list manga">
        {[...languages]
          .sort((a, b) => a.localeCompare(b))
          .map((language, i) => (
            <li
              key={i}
              className="languages manga"
              onClick={() => {
                resetPage();
                setSelectedLanguage(language);
              }}
            >
              <button
                className={`hover${
                  language == selectedLanguage ? " current" : ""
                }`}
              >
                {language.slice(0, 1).toUpperCase() + language.slice(1)}
              </button>
            </li>
          ))}
      </ul>
      <ArrowContainer
        top={true}
        onLeftArrowClick={decrementPage}
        onRightArrowClick={incrementPage}
      >
        <div className="page-counter">
          Page {currentPage + 1} of {totalPages}
        </div>
      </ArrowContainer>
      <ul className="chapter-list">
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
      </ul>
      <div className="chapter-list-bottom-buttons">
        {offset != 0 ? (
          <button
            onClick={() => {
              resetPage();
              setOffset((prev) => (prev -= 96));
            }}
          >
            Go Back
          </button>
        ) : (
          ""
        )}
        {offset + 96 < maxOffset && currentPage == totalPages - 1 ? (
          <button
            onClick={() => {
              resetPage();
              setOffset((prev) => (prev += 96));
            }}
          >
            Look for more Chapters
          </button>
        ) : (
          ""
        )}
      </div>
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
    </div>
  );
};

export default ChapterList;
