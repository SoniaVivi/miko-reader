import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetMangaListQuery } from "../../aniListSlice";

const useMangaList = (status) => {
  const { userId, accessToken } = useSelector((state) => ({
    userId: state.user.id,
    accessToken: state.user.accessTokenData.accessToken,
  }));

  const { listData, isListSuccessful } = useGetMangaListQuery(
    { accessToken, userId, listType: status.toUpperCase() },
    {
      selectFromResult: (response) => ({
        listData: response?.data?.entities,
        isListSuccessful: response.isSuccess,
      }),
      skip: !userId || !accessToken || !status,
    }
  );

  const mangaTitles = useMemo(
    () =>
      listData
        ? Object.values(listData).map((mangaData) => mangaData.title)
        : [],
    [listData]
  );

  return {
    mangaTitles,
    isListSuccessful,
    successfulAndHasEntries: isListSuccessful && mangaTitles.length,
  };
};

export default useMangaList;
