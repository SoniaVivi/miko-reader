import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ArrowContainer from "./ArrowContainer";
import ChapterListChild from "./ChapterListChild";
import { pageMenu } from "./pageMenu";

const ChapterList = () => {
  const chapters = useSelector((state) => state.manga.chapters);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChapters, setCurrentChapters] = useState(chapters.slice(0, 11));
  const totalPages = Math.ceil((chapters.length + 1) / 12);
  const decrementPage = () =>
    setCurrentPage((current) => (current != 0 ? current - 1 : current));
  const incrementPage = () =>
    setCurrentPage((current) =>
      current != totalPages - 1 ? current + 1 : current
    );
  useEffect(() => {
    let start = currentPage * 12;
    start = start == chapters.length ? start - 1 : start;
    setCurrentChapters(chapters.slice(start, currentPage * 12 + 11));
  }, [currentPage, chapters]);

  return (
    <div className="chapter-list main-background">
      <div className="languages-list manga">
        {["Eng", "Jp", "Es"].map((language, i) => (
          <div key={i} className="languages manga">
            {language}
          </div>
        ))}
      </div>
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
            uploader={chapterData.uploader}
            group={chapterData.group}
            title={chapterData.title}
            uploaded={chapterData.uploaded}
            chapterId={chapterData.id}
          />
        ))}
      </ul>
      <ArrowContainer
        className="align-btm"
        onLeftArrowClick={decrementPage}
        onRightArrowClick={incrementPage}
      >
        {pageMenu(totalPages, currentPage + 1).map((pageNum, i) =>
          pageNum != "..." ? (
            <button
              key={i}
              onClick={(e) => setCurrentPage(e.target.textContent - 1)}
              className={`hover chapter-list${
                pageNum == currentPage + 1 ? " current" : ""
              }`}
            >
              {pageNum}
            </button>
          ) : (
            <div className="dot-placeholder">...</div>
          )
        )}
      </ArrowContainer>
    </div>
  );
};

export default ChapterList;
