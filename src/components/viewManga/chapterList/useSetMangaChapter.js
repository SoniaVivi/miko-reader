import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setChapterId } from "../../../mangaSlice";
import { setLanguage } from "../../../settingsSlice";

const useSetMangaChapter = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  return ({ chapterId, language, chapterNumber }) => {
    dispatch(setChapterId(chapterId));
    dispatch(setLanguage(language));
    history.push(`/${params.manga}/${chapterNumber}/1`);
  };
};

export default useSetMangaChapter;
