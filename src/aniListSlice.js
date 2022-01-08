import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mediaListQuery = `query getList($userId: Int, $type: MediaType, $status: MediaListStatus) {
  MediaListCollection(userId: $userId, type: $type, status: $status) {
    lists {
      entries {
        mediaId
        status
        score (format: POINT_5)
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
  response.data.MediaListCollection.lists[0].entries.map(
    (mangaData) => mangaData.media.title.native
  );

export const aniListSlice = createApi({
  reducerPath: "aniList",
  baseQuery: fetchBaseQuery({
    //eslint-disable-next-line no-undef
    baseUrl: process.env.REACT_APP_ANILIST,
  }),
  tagTypes: ["Status", "Score"],
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
    getReadingList: builder.query({
      query: ({ accessToken, userId }) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: mediaListQuery,
          variables: {
            type: "MANGA",
            status: "CURRENT",
            userId: userId,
          },
        },
      }),
      transformResponse: selectTitlesFromMediaListQuery,
      providesTags: ["Status", "Score"],
    }),
    getPlanningList: builder.query({
      query: ({ accessToken, userId }) => ({
        url: "/",
        method: "POST",
        headers: tokenHeaders(accessToken),
        body: {
          query: mediaListQuery,
          variables: {
            type: "MANGA",
            status: "PLANNING",
            userId: userId,
          },
        },
      }),
      transformResponse: selectTitlesFromMediaListQuery,
      providesTags: ["Status", "Score"],
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
                mediaListEntry {
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
      transformResponse: (responseData) => ({
        id: responseData?.data?.Media?.id,
        ...responseData?.data?.Media?.mediaListEntry,
      }),
      providesTags: ["Status", "Score"],
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
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetReadingListQuery,
  useGetPlanningListQuery,
  useGetMangaFromTitleQuery,
  useUpdateMangaStatusMutation,
  useUpdateMangaScoreMutation,
} = aniListSlice;
