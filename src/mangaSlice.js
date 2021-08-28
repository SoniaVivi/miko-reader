import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  id: -1,
  name: "",
  cover: "",
  publicationStatus: "",
  author: "",
  artist: "",
  synopsis: "",
  chapters: [],
};

export const slice = createSlice({
  name: "manga",
  initialState: emptyState,
  reducers: {
    setMangaAttributes: {
      reducer(state, action) {
        return { ...state, ...action.payload };
      },
      prepare(
        id,
        name,
        cover,
        publicationStatus,
        synopsis,
        author,
        artist,
        chapters
      ) {
        return {
          payload: {
            id,
            name,
            cover,
            publicationStatus,
            synopsis,
            author,
            artist,
            chapters,
          },
        };
      },
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    closeManga: (state) => {
      //eslint-disable-next-line no-unused-vars
      state.manga = { ...emptyState };
    },
  },
});

export const { setMangaAttributes, closeManga, setId } = slice.actions;

export default slice.reducer;
