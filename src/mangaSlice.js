import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  id: -1,
  aniListId: -1,
  chapterId: -1,
  title: "",
  recentlyViewed: [],
};

export const slice = createSlice({
  name: "manga",
  initialState: emptyState,
  reducers: {
    setActiveManga: {
      reducer(state, action) {
        state.id = action.payload.id;
        state.aniListId = action.payload.aniListId;
        const newId = action.payload.id;
        !state.recentlyViewed.includes(newId) &&
        state.recentlyViewed.unshift(newId) >= 11
          ? state.recentlyViewed.pop()
          : "";
      },
      prepare(id, aniListId = -1) {
        return {
          payload: {
            id,
            aniListId,
          },
        };
      },
    },
    setChapterId: {
      reducer(state, action) {
        state.chapterId = action.payload.chapterId;
      },
      prepare(chapterId) {
        return { payload: { chapterId } };
      },
    },
    setTitle: {
      reducer(state, action) {
        state.title = action.payload.title;
      },
      prepare(title) {
        return { payload: { title } };
      },
    },
    setAniListId: {
      reducer(state, action) {
        state.aniListId = action.payload.id;
      },
      prepare(id) {
        return { payload: { id } };
      },
    },
  },
});

export const { setActiveManga, setChapterId, setTitle, setAniListId } =
  slice.actions;

export default slice.reducer;
