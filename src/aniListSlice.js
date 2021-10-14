import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aniListSlice = createApi({
  reducerPath: "aniList",
  baseQuery: fetchBaseQuery({ baseUrl: "https://graphql.anilist.co" }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: (accessToken) => ({
        url: "/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          query: `query getUser{
                    Viewer {
                      id
                      name
                      }
                  }`,
        },
      }),
    }),
    getReadingList: builder.query({
      query: ({ accessToken, userId }) => ({
        url: "/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          query: `query getList($userId: Int, $type: MediaType, $status: MediaListStatus) {
            MediaListCollection(userId: $userId, type: $type, status: $status) {
              lists {
                entries {
                  mediaId
                  status
                  score
                  media {
                    title {
                      native
                    }
                  }
                }
              }
            }
          }`,
          variables: {
            type: "MANGA",
            status: "CURRENT",
            userId: userId,
          },
        },
      }),
      transformResponse: (responseData) =>
        responseData.data.MediaListCollection.lists[0].entries.map(
          (mangaData) => mangaData.media.title.native
        ),
    }),
  }),
});

export const { useGetCurrentUserQuery, useGetReadingListQuery } = aniListSlice;
