import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setActiveManga, setChapterId, setTitle } from "../mangaSlice";

const useFetchMangaFromTitle = () => {
  const mangaId = useSelector((state) => state.manga.id);
  const language = useSelector((state) => state.settings.language);
  const params = useParams();
  const dispatch = useDispatch();
  const loading = useRef(false);
  if (!loading.current && mangaId == -1 && language) {
    loading.current = true;
    //eslint-disable-next-line no-undef
    fetch(`${process.env.REACT_APP_MANGADEX}/manga?title=${params.manga}`)
      .then((r) => r.json())
      .then((responseData) => {
        const lowerCaseTitle = params.manga.toLowerCase();
        let potentialMatch = responseData.data.find((manga) => {
          const currentTitle = manga.attributes?.title[language].toLowerCase();
          return (
            currentTitle == lowerCaseTitle ||
            currentTitle == lowerCaseTitle.replace(/-/, " ")
          );
        });
        const currentManga = potentialMatch ?? responseData.data[0];
        dispatch(setActiveManga(currentManga.id));
        dispatch(
          setTitle(currentManga.attributes?.title[language] ?? "Unknown")
        );
        if (params.chapter) {
          fetch(
            //eslint-disable-next-line no-undef
            `${process.env.REACT_APP_MANGADEX}/chapter?manga=${currentManga.id}&translatedLanguage[]=${language}&chapter=${params.chapter}`
          )
            .then((r) => r.json())
            .then((response) => dispatch(setChapterId(response.data[0].id)))
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  }
};

export default useFetchMangaFromTitle;
