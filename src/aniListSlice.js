import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mediaListQuery = `query getList($userId: Int, $type: MediaType, $status: MediaListStatus) {
  MediaListCollection(userId: $userId, type: $type, status: $status) {
    lists {
      entries {
        mediaId
        status
        score (format: POINT_5)
        progress
        media {
          title {
            native
          }
        }
      }
    }
  }
}`;

const tokenHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});

const selectTitlesFromMediaListQuery = (response) =>
  response.data.MediaListCollection.lists[0].entries.map((mangaData) => ({
    id: mangaData?.mediaId,
    score: mangaData?.score,
    status: mangaData?.status,
    title: mangaData?.media?.title?.native,
    progress: mangaData?.media?.progress,
  }));

const mangaAdapter = createEntityAdapter();
const mangaInitialState = mangaAdapter.getInitialState();

export const aniListSlice = createApi({
  reducerPath: "aniList",
  baseQuery: fetchBaseQuery({
    //eslint-disable-next-line no-undef
    baseUrl: process.env.REACT_APP_ANILIST,
  }),
  tagTypes: ["Status", "Score", "Progress"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: (accessToken) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: `query getUser{
                    Viewer {
                      id
                      name
                      avatar {
                        medium
                      }
                      }
                  }`,
        },
      }),
    }),
    getMangaList: builder.query({
      // listType must be a string with a value of one of the following (in all uppercase):
      // current, planning, completed, dropped, paused, or repeating
      query: ({ accessToken, userId, listType }) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: mediaListQuery,
          variables: {
            type: "MANGA",
            status: listType,
            userId: userId,
          },
        },
      }),
      transformResponse: (responseData) =>
        mangaAdapter.upsertMany(
          mangaInitialState,
          selectTitlesFromMediaListQuery(responseData)
        ),
      providesTags: ["Status", "Score", "Progress"],
    }),
    getMangaFromTitle: builder.query({
      query: ({ accessToken, search }) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: `
            query getMangaFromName($search: String) {
              Media (search: $search, type: MANGA) {
                id
                title {
                  native
                }
                mediaListEntry {
                  progress
                  status
                  score (format: POINT_5)
                }
              }
            }
          `,
          variables: {
            search: search,
          },
        },
      }),
      transformResponse: (responseData) =>
        mangaAdapter.addOne(mangaInitialState, {
          id: responseData?.data?.Media?.id,
          title: responseData?.data?.Media?.title?.native,
          status: responseData?.data?.Media?.mediaListEntry?.status,
          score: responseData?.data?.Media?.mediaListEntry?.score,
          progress: responseData?.data?.Media?.mediaListEntry?.progress,
        }),
      providesTags: ["Status", "Score", "Progress"],
    }),
    updateMangaStatus: builder.mutation({
      query: ({ accessToken, mediaId, newStatus }) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: `
          mutation ($mediaId: Int, $status: MediaListStatus) {
            SaveMediaListEntry (mediaId: $mediaId, status: $status) {
                id
                status
            }
          }
          `,
          variables: { mediaId, status: newStatus },
        },
      }),
      invalidatesTags: ["Status"],
    }),
    updateMangaScore: builder.mutation({
      query: ({ accessToken, mediaId, score }) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: `
          mutation ($mediaId: Int, $score: Int) {
            SaveMediaListEntry (mediaId: $mediaId, scoreRaw: $score) {
                id
                score
            }
          }
          `,
          variables: { mediaId, score: score },
        },
      }),
      invalidatesTags: ["Score"],
    }),
    updateMangaProgress: builder.mutation({
      query: ({ accessToken, mediaId, progress }) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: `
          mutation ($mediaId: Int, $progress: Int) {
            SaveMediaListEntry (mediaId: $mediaId, progress: $progress) {
                id
                progress
            }
          }
          `,
          variables: { mediaId, progress },
        },
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetMangaFromTitleQuery,
  useUpdateMangaStatusMutation,
  useUpdateMangaScoreMutation,
  useUpdateMangaProgressMutation,
  useGetMangaListQuery,
} = aniListSlice;
