import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  id: -1,
  chapterId: -1,
  title: "",
  recentlyViewed: ["6670ee28-f26d-4b61-b49c-d71149cd5a6e"],
};

export const slice = createSlice({
  name: "manga",
  initialState: emptyState,
  reducers: {
    setActiveManga: {
      reducer(state, action) {
        state.id = action.payload.id;
        state.recentlyViewed.unshift(action.payload.id) >= 11
          ? state.recentlyViewed.pop()
          : "";
      },
      prepare(id) {
        return {
          payload: {
            id,
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
  },
});

export const { setActiveManga, setChapterId, setTitle } = slice.actions;

export default slice.reducer;
