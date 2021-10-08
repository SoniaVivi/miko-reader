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
    fetch(`https://api.mangadex.org/manga?title=${params.manga}`)
      .then((r) => r.json())
      .then((responseData) => {
        const currentManga = responseData.data[0];
        dispatch(setActiveManga(currentManga.id));
        dispatch(
          setTitle(currentManga.attributes?.title[language] ?? "Unknown")
        );
        if (params.chapter) {
          fetch(
            `https://api.mangadex.org/chapter?manga=${currentManga.id}&translatedLanguage[]=${language}&chapter=${params.chapter}`
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
