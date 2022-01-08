import { useSelector } from "react-redux";
import { useGetMangaFromTitleQuery } from "../../aniListSlice";
import { isLoggedIn, tokenSelector } from "../../userSlice";

const useMangaFromAuthenicatedQuery = (selector) => {
  const loggedIn = useSelector(isLoggedIn);
  const userToken = useSelector(tokenSelector);
  const mangaTitle = useSelector((state) => state.manga.title);
  const mediaData = useGetMangaFromTitleQuery(
    { accessToken: userToken.accessToken, search: mangaTitle },
    {
      selectFromResult: selector,
      skip: !mangaTitle || !userToken?.accessToken,
    }
  );

  if (loggedIn) {
    return { ...mediaData, loggedIn, userToken } ?? { loggedIn };
  }
  return { loggedIn };
};

export default useMangaFromAuthenicatedQuery;
