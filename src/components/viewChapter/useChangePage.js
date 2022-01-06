import { useDispatch, useSelector } from "react-redux";
import { setChapterId } from "../../mangaSlice";
import useGetCurrentChapterQuery from "./useGetCurrentChapterQuery";
import { useGetMangaAggregateQuery } from "../../apiSlice";
import { useHistory, useParams } from "react-router-dom";

const useChangePage = (recachePages, secondImage, wasPrevImageLandscape) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const queryParams = useSelector((state) => ({
    mangaId: state.manga.id,
    language: state.settings.language,
  }));
  const { data: mangaData } = useGetMangaAggregateQuery(queryParams, {
    skip: !queryParams || queryParams.id == -1,
  });
  const { pages } = useGetCurrentChapterQuery();
  const changeChapters = (action) =>
    Object.values(mangaData)
      .reduce(
        (newArry, volume) => [...newArry, ...Object.values(volume.chapters)],
        []
      )
      .sort((a, b) => Number(a.chapter) - Number(b.chapter))
      .find((chapter) => {
        const current = Number(params.chapter);
        const chapterNum = Number(chapter.chapter);

        if (
          ((chapterNum < current && action == "decrement") ||
            (chapterNum > current && action == "increment")) &&
          Math.abs(chapterNum - current) <= 1
        ) {
          dispatch(setChapterId(chapter.id));
          history.push(`/${params.manga}/${chapterNum}/1`);
          recachePages();
          return true;
        }
      });
  const changePage = (action) => {
    const currentPage = Number(params.page);
    let newPage;
    if (action == "increment") {
      newPage = currentPage + (secondImage == null ? 1 : 2);
    } else if (action == "decrement" && currentPage > 1) {
      newPage =
        currentPage - (wasPrevImageLandscape || currentPage == 2 ? 1 : 2);
    }
    if (!newPage || newPage <= 0) {
      changeChapters("decrement");
      return;
    } else if (newPage > pages.length) {
      changeChapters("increment");
      return;
    }
    history.push(`/${params.manga}/${params.chapter}/${newPage}`);
  };
  return changePage;
};

export default useChangePage;
