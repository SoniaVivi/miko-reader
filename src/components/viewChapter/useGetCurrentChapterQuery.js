import { useSelector } from "react-redux";
import { useGetChapterQuery } from "../../apiSlice";

const useGetCurrentChapterQuery = () => {
  const { chapterId } = useSelector((state) => ({
    chapterId: state.manga.chapterId,
  }));

  const { data: chapterData } = useGetChapterQuery(chapterId, {
    skip: !chapterId || chapterId == -1,
  });

  return (
    chapterData ?? { user: null, group: null, pages: [], id: null, hash: null }
  );
};

export default useGetCurrentChapterQuery;
