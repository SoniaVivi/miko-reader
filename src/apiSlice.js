import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";

const mangaAdapter = createEntityAdapter();
const chapterAdapter = createEntityAdapter();
const groupAdapter = createEntityAdapter();
const mangaInitialState = mangaAdapter.getInitialState();
const chapterInitialState = chapterAdapter.getInitialState();
const groupInitialState = groupAdapter.getInitialState();

const getCoverURL = (mangaData) =>
  `https://uploads.mangadex.org/covers/${mangaData.id}/${mangaData.relationships[2].attributes.fileName}.512.jpg`;
const getTitle = (mangaData) =>
  mangaData.attributes.title[Object.keys(mangaData.attributes.title)[0]];

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.mangadex.org" }),
  endpoints: (builder) => ({
    getMangas: builder.query({
      query: (mangaIds) =>
        `/manga?ids[]=${mangaIds.join(
          "&ids[]="
        )}&includes[]=artists&includes[]=authors&includes[]=cover_art`,
      transformResponse: (responseData) => {
        return mangaAdapter.setAll(
          mangaInitialState,
          responseData.data.map((manga) => {
            return {
              ...manga,
              coverUrl: getCoverURL(manga),
              title: getTitle(manga),
              publicationStatus: manga.attributes.status,
              synopsis: manga.attributes.description.en,
              authorId: manga.relationships.find(
                (relation) => relation.type === "author"
              ).id,
              artistId: manga.relationships.find(
                (relation) => relation.type === "artist"
              ).id,
            };
          })
        );
      },
    }),
    getChapters: builder.query({
      query: ({ mangaId, offset = 0 }) =>
        `/manga/${mangaId}/feed?&order[volume]=desc&order[chapter]=desc&offset=${offset}`,
      transformResponse: (responseData) => {
        return chapterAdapter.setAll(
          chapterInitialState,
          responseData.data.map((chapter) => {
            return {
              ...chapter,
              id: chapter.id,
              uploader: chapter.relationships.find(
                (relation) => relation.type === "user"
              ),
              group: chapter.relationships.find(
                (relation) => relation.type === "scanlation_group"
              ),
              title:
                chapter.attributes.title ||
                `Chapter ${chapter.attributes.chapter}`,
              uploaded: chapter.attributes.createdAt,
              language: chapter.attributes.translatedLanguage,
              chapterNumber: chapter.attributes.chapter,
            };
          })
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
      query: (groupIds) => `/group?ids[]=${groupIds.join("&ids[]=")}`,
      transformResponse: (responseData) => {
        return groupAdapter.setAll(
          groupInitialState,
          responseData.data.map((group) => ({
            ...group,
            name: group.attributes?.name,
          }))
        );
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
} = apiSlice;
