import { useSelector } from "react-redux";
import { useGetMangaFromTitleQuery } from "../../aniListSlice";
import { isLoggedIn, tokenSelector } from "../../userSlice";

const useMangaFromAuthenicatedQuery = (selector) => {
  const loggedIn = useSelector(isLoggedIn);
  const userToken = useSelector(tokenSelector);
  const mangaTitle = useSelector((state) => state.manga.title);
  const { isError, mediaData, isLoading } = useGetMangaFromTitleQuery(
    { accessToken: userToken.accessToken, search: mangaTitle },
    {
      selectFromResult: (data) => ({
        isError: data.isError,
        isLoading: data.isLoading,
        mediaData: selector(data),
      }),
      skip: !mangaTitle || !userToken?.accessToken,
    }
  );

  if (loggedIn && !isError && !isLoading) {
    return { ...mediaData, loggedIn, userToken } ?? { loggedIn };
  }
  return { loggedIn };
};

export default useMangaFromAuthenicatedQuery;
