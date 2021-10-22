import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";
import getCoverUrl from "./components/helpers/getCoverUrl";
import getTitle from "./components/helpers/getTitle";

const mangaAdapter = createEntityAdapter();
const mangaInitialState = mangaAdapter.getInitialState();
const findInRelationships = (relationshipName, data = null) =>
  data &&
  data.relationships.find((relation) => relation.type === relationshipName);
const getDataFromMangas = (response) => {
  const newAttributesFunc = (manga) => ({
    ...manga,
    coverUrl: getCoverUrl(manga),
    title: getTitle(manga),
    publicationStatus: manga.attributes.status,
    synopsis: manga.attributes.description.en,
    authorId: findInRelationships("author", manga)?.id,
    artistId: findInRelationships("artist", manga)?.id,
  });
  if (response.data) {
    return response.data.map(newAttributesFunc);
  } else if (response) {
    return newAttributesFunc(response);
  }
  return {};
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.mangadex.org" }),
  prepareHeaders: (headers) => {
    headers.set("mode", `no-cors`);
    return headers;
  },
  endpoints: (builder) => ({
    getMangas: builder.query({
      query: (mangaIds) =>
        `/manga?ids[]=${mangaIds.join(
          "&ids[]="
        )}&includes[]=artists&includes[]=authors&includes[]=cover_art`,
      transformResponse: (responseData) =>
        mangaAdapter.addMany(
          mangaInitialState,
          getDataFromMangas(responseData)
        ),
    }),
    getChapters: builder.query({
      query: ({ mangaId, offset = 0 }) =>
        `/manga/${mangaId}/feed?&order[volume]=desc&order[chapter]=desc&offset=${offset}`,
      transformResponse: (responseData) => {
        return mangaAdapter.upsertMany(
          mangaInitialState,
          responseData.data.map((chapter) => ({
            ...chapter,
            id: chapter.id,
            uploader: findInRelationships("user", chapter),
            group: findInRelationships("scanlation_group", chapter),
            title:
              chapter.attributes.title ||
              `Chapter ${chapter.attributes.chapter}`,
            uploaded: chapter.attributes.createdAt,
            language: chapter.attributes.translatedLanguage,
            chapterNumber: chapter.attributes.chapter,
          }))
        );
      },
    }),
    getAuthor: builder.query({
      query: (authorId) => `/author/${authorId}?includes[]=name`,
    }),
    getUser: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
    getGroups: builder.query({
      query: (groupIds) => `/group?ids[]=${groupIds.join("&ids[]=")}&limit=100`,
      transformResponse: (responseData) => {
        return mangaAdapter.addMany(
          mangaInitialState,
          responseData.data.map((group) => ({
            ...group,
            name: group.attributes?.name,
          }))
        );
      },
    }),
    getMangaAggregate: builder.query({
      query: ({ mangaId, language }) =>
        `/manga/${mangaId}/aggregate?translatedLanguage[]=${language}`,
      transformResponse: (responseData) => responseData.volumes,
    }),
    getChapter: builder.query({
      query: (chapterId) => `/chapter/${chapterId}`,
      transformResponse: (responseData) => ({
        ...responseData.data,
        group: findInRelationships("scanlation_group", responseData.data),
        uploader: findInRelationships("user", responseData.data),
        pages: responseData.data?.attributes.data,
        id: responseData.data.id,
        hash: responseData.data?.attributes.hash,
      }),
    }),
    getServerURL: builder.query({
      query: (chapterId) => `/at-home/server/${chapterId}`,
    }),
    getMangasByTitle: builder.query({
      query: (mangaTitle) => `/manga?title=${mangaTitle}&includes[]=cover_art`,
      transformResponse: (responseData) =>
        mangaAdapter.addMany(
          mangaInitialState,
          getDataFromMangas(responseData)
        ),
    }),
    getMangaByTitle: builder.query({
      query: (mangaTitle) =>
        `/manga?title=${mangaTitle}&includes[]=artists&includes[]=authors&includes[]=cover_art`,
      transformResponse: (responseData) => {
        try {
          return mangaAdapter.addOne(
            mangaInitialState,
            getDataFromMangas(responseData?.data[0])
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetMangasQuery,
  useGetAuthorQuery,
  useGetUserQuery,
  useGetGroupsQuery,
  useGetMangaAggregateQuery,
  useGetChapterQuery,
  useGetServerURLQuery,
  useGetMangasByTitleQuery,
  useGetMangaByTitleQuery,
} = apiSlice;
