import React, { useMemo } from "react";
import PropTypes from "prop-types";
import useMangaFromAuthenicatedQuery from "../../aniList/useMangaFromAuthenicatedQuery";
import Hint from "../../styled/Hint";
import useSetMangaChapter from "./useSetMangaChapter";
import Play from "../../../assets/svgs/Play";

const StartFromLastChapterButton = (props) => {
  const setMangaChapter = useSetMangaChapter();
  const { progress: aniListProgress } = useMangaFromAuthenicatedQuery(
    (data) => ({
      progress: data?.progress,
    })
  );
  const nextChapter = useMemo(
    () =>
      [...props.chapters].reverse().find((chapter) => {
        if (Number(chapter.chapterNumber) > aniListProgress) {
          return {
            chapterNumber: chapter.chapterNumber,
            language: chapter.language,
            id: chapter.chapterId,
          };
        }
      }) || false,
    [props.chapters, aniListProgress]
  );
  if (nextChapter != false) {
    return (
      <Play
        className="clickable"
        onClick={() =>
          setMangaChapter({
            chapterNumber: nextChapter.chapterNumber,
            language: nextChapter.language,
            chapterId: nextChapter.id,
          })
        }
      >
        <Hint width={"120px"} left={"-50px"}>
          Start from chapter {nextChapter.chapterNumber}
        </Hint>
      </Play>
    );
  }

  return null;
};

export default StartFromLastChapterButton;

StartFromLastChapterButton.propTypes = {
  chapters: PropTypes.array.isRequired,
};
